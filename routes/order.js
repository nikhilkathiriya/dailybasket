const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust path as needed
const moment = require('moment'); // For date calculations
const mongoose = require('mongoose')
// Create Order Route
router.post('/create', async (req, res) => {
    try {
        // Extract user ID from the authenticated user
        const user_id = req.user._id;

        // Extract fields from the request body
        const {
            total_amount,
            shippingCharge,
            products,
            scheduleDelivery,
            deliveryDate,
            paymentStatus
        } = req.body;

        // Validate required fields
        if (!total_amount || !products || products.length === 0) {
            return res.status(400).json({message: 'Total amount and products are required.'});
        }

        // Extract address details from the authenticated user
        const deliveryAddress = {
            street: req.user.address || 'Not provided',
            postcode: req.user.postcode || 'Not provided',
        };

        // Default schedule delivery
        const schedule = scheduleDelivery || {
            deliver: false,
            often: 0,
            interval: 0
        };

        // Delivery date logic (e.g., next day delivery by default)
        const deliveryDateValue = new Date(Date.now() + 48 * 60 * 60 * 1000); // Default to tomorrow

        // Create a new order object
        const newOrder = new Order({
            user_id,
            total_amount,
            shippingCharge: shippingCharge || 0, // Default shippingCharge to 0 if not provided
            status: 'pending', // Default order status
            paymentStatus: paymentStatus || 'pending', // Default payment status
            products,
            scheduleDelivery: schedule,
            deliveryAddress,
            deliveryDate: deliveryDateValue
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        const order = savedOrder.toObject()
        if (order.scheduleDelivery.deliver) {
            order.nextDelivery = deliveryDateValue
            order.remainingDeliveries = schedule.often
            // :TODO Setup crown job for this order
        }

        // Return success response
        res.status(200).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        // Handle errors
        console.error('Error placing order:', error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

router.post('/cancel', async (req, res) => {
    try {
        const orderId = req.body.order_id; // Extract order ID from body
        const userId = req.user._id; // Extract user ID from authenticated user

        // Validate order ID and user ID
        if (!orderId) {
            return res.status(400).json({message: 'order_id is required'});
        }

        // Check if the order ID is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(orderId)) {
            return res.status(400).json({message: 'Invalid order_iD'});
        }

        // Find the order by ID and user ID to ensure the user owns the order
        const order = await Order.findOne({_id: orderId, user_id: userId});

        // Check if order exists
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        // Check if the order is already cancelled
        if (order.status === 'cancelled') {
            return res.status(400).json({message: 'Order is already cancelled'});
        }

        // Update the order status to 'cancelled'
        order.status = 'cancelled';

        // If the order is scheduled then cancel future delivery
        if (order.scheduleDelivery.deliver) {
            order.scheduleDelivery.deliver = false
            // :TODO cancel crown job for this order
        }
        await order.save();

        // Respond with success message
        res.status(200).json({
            message: 'Order cancelled successfully',
            order
        });

    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
});
router.get('/', async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authenticated user

        // Fetch orders for the user, sorted by creation date (latest first)
        const orders = await Order.find({user_id: userId}).sort({createdAt: -1});

        // Check if orders exist
        if (!orders || orders.length === 0) {
            return res.status(404).json({message: 'No orders found'});
        }

        // Process each order to calculate additional details for scheduled deliveries
        const processedOrders = orders.map(order => {
            const {scheduleDelivery, deliveryDate} = order;

            // Initialize default values
            let nextDelivery = null;
            let remainingDeliveries = 0;

            // If scheduleDelivery is enabled, calculate dates
            if (scheduleDelivery.deliver) {
                const interval = scheduleDelivery.interval || 0; // Interval in days
                const often = scheduleDelivery.often || 0; // Total occurrences
                const deliveries = []; // List of all scheduled delivery dates

                // Generate delivery dates based on interval and often
                for (let i = 1; i <= often; i++) {
                    deliveries.push(moment(deliveryDate).add(i * interval, 'days'));
                }

                // Find the next delivery date
                nextDelivery = deliveries.find(date => moment(date).isAfter(moment()));

                // Calculate remaining deliveries
                remainingDeliveries = deliveries.filter(date => moment(date).isAfter(moment())).length;
            }

            return {
                ...order.toObject(), // Include existing order details
                nextDelivery,       // Add next delivery date
                remainingDeliveries // Add count of remaining deliveries
            };
        });

        // Respond with processed orders
        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders: processedOrders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

// Get a specific order by ID
// router.post('/getorder', async (req, res) => {
//     try {
//         const orderId = req.body.id; // Extract order ID from URL params
//         const userId = req.user._id; // Extract user ID from authenticated user
//
//         // Find the order by ID and ensure it belongs to the authenticated user
//         const order = await Order.findOne({ _id: orderId, user_id: userId });
//
//         // Check if the order exists
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//
//         // Respond with the order
//         res.status(200).json({
//             message: 'Order retrieved successfully',
//             order
//         });
//     } catch (error) {
//         console.error('Error fetching order:', error);
//         res.status(500).json({ message: 'Internal Server Error', error });
//     }
// });

// Get Scheduled Deliveries
router.get('/scheduled', async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authenticated user

        // Fetch orders where scheduleDelivery is enabled and deliveries are pending
        const orders = await Order.find({
            user_id: userId,
            'scheduleDelivery.deliver': true,
            status: {$ne: 'cancelled'} // Exclude cancelled orders
        }).sort({createdAt: -1});

        // Filter orders to calculate remaining deliveries
        const scheduledOrders = orders.map(order => {
            const {scheduleDelivery, deliveryDate} = order;

            // Calculate next delivery date
            const interval = scheduleDelivery.interval || 0; // Days interval
            const often = scheduleDelivery.often || 0; // Total scheduled deliveries
            const deliveries = []; // Store all scheduled delivery dates

            // Generate delivery dates based on interval and often
            for (let i = 1; i <= often; i++) {
                deliveries.push(moment(deliveryDate).add(i * interval, 'days'));
            }

            // Find the next delivery date that is after today
            const nextDelivery = deliveries.find(date => moment(date).isAfter(moment()));

            // Calculate remaining deliveries
            const remainingDeliveries = deliveries.filter(date => moment(date).isAfter(moment())).length;

            return {
                ...order.toObject(), // Include existing order details
                nextDelivery: nextDelivery || null,
                remainingDeliveries: remainingDeliveries
            };
        });

        // Filter out orders with no remaining deliveries
        const filteredOrders = scheduledOrders.filter(order => order.remainingDeliveries > 0);

        // Check if no scheduled orders are found
        if (!filteredOrders || filteredOrders.length === 0) {
            return res.status(404).json({message: 'No scheduled deliveries found'});
        }

        // Respond with scheduled orders
        res.status(200).json({
            message: 'Scheduled deliveries retrieved successfully',
            orders: filteredOrders
        });
    } catch (error) {
        console.error('Error fetching scheduled deliveries:', error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

//---------------------------------------
// API to Cancel Scheduled Delivery (Retain Delivery Dates)
//---------------------------------------
router.post('/cancel-schedule', async (req, res) => {
    try {
        const orderId = req.body.order_id;
        const order = await Order.findById(orderId);

        if (!order || !order.scheduleDelivery.deliver) {
            return res.status(404).json({message: 'Scheduled delivery not found'});
        }

        // Retain deliveryDates but disable future deliveries
        order.scheduleDelivery.deliver = false;
        order.status = "cancelled"
        // :TODO cancel crown job for this order
        await order.save();

        res.status(200).json({message: 'Scheduled delivery cancelled successfully', order});
    } catch (error) {
        console.error('Error cancelling schedule:', error);
        res.status(500).json({message: 'Internal Server Error', error});
    }
});

module.exports = router;


module.exports = router;
