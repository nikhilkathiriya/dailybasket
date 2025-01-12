const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    total_amount: {type: Number, required: true},
    shippingCharge: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending'},
    products: [{
        product_id: {type: Number, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    scheduleDelivery: {
        deliver: {type: Boolean, default: false},
        often: {type: Number, default: 0},
        interval: {type: Number, default: 0},
        deliveryDates: { type: [Date], default: [] }
    },
    paymentStatus: {type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'},
    deliveryAddress: {
        street: {type: String, required: true},
        postcode: {type: String, required: true}
    },
    deliveryDate: {type: Date, required: false},

}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;