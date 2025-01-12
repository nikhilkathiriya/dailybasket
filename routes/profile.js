const {Router} = require('express');
const router = Router();
const User = require("../models/User");

router.post('/get', async (req, res) => {
    try {
        if (!req.body.user_id) {
            res.status(400).json({message: 'user_id is required'});
        }
        const user = await User.findById(req.body.user_id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const userDetails = user.toObject()
        delete userDetails.password; // remove password from the response
        delete userDetails.tempPass; // remove temp password from the response
        res.status(200).json({userDetails});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
})

// Update User Details API
router.post('/update', async (req, res) => {
    try {
        const {updateFields} = req.body;
        // Find the user
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        // Allowed keys for update
        const allowedKeys = [
            'firstName', 'lastName', 'phone', 'address', 'postcode',
            'paymentDetails.cardHolder', 'paymentDetails.cardNumber',
            'paymentDetails.expiryDate', 'paymentDetails.cvv',
        ];

        // Validate and filter update fields
        const updates = {};
        Object.keys(updateFields).forEach(key => {
            if (allowedKeys.includes(key)) {
                updates[key] = updateFields[key];
            }
        });

        // Validate payment details format
        if (updates.paymentDetails) {
            const {cardNumber, expiryDate, cvv} = updates.paymentDetails;
            if (cardNumber && typeof cardNumber !== 'number') {
                return res.status(400).json({message: 'Invalid card number'});
            }
            if (expiryDate && typeof expiryDate !== 'number') {
                return res.status(400).json({message: 'Invalid expiry date'});
            }
            if (cvv && typeof cvv !== 'number') {
                return res.status(400).json({message: 'Invalid CVV'});
            }
        }

        // Update user details
        Object.keys(updates).forEach(key => {
            user[key] = updates[key];
        });
        await user.save();
        const userDetails = user.toObject()
        delete userDetails.password; // remove password from the response
        delete userDetails.tempPass; // remove temp password from the response

        res.status(200).json({message: 'User updated successfully', userDetails});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
});

// Manage wishlist (add or remove)
router.post('/wishlist', async (req, res) => {
    const userId = req.user._id;  // Get user ID from JWT payload
    const { productId, action } = req.body; // Get productId and action (true/false)

    if (productId === undefined || action === undefined) {
        return res.status(400).json({ message: 'Both productId and action are required' });
    }

    if (typeof action !== 'boolean') {
        return res.status(400).json({ message: 'Action must be a boolean value (true or false)' });
    }

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (action) {
            // Add the product to the wishlist if not already present
            if (!user.wishList.includes(productId)) {
                user.wishList.push(productId);
                await user.save();
                return res.status(200).json({ message: 'Product added to wishlist', wishList: user.wishList });
            } else {
                return res.status(400).json({ message: 'Product already in wishlist' });
            }
        } else {
            // Remove the product from the wishlist if present
            const index = user.wishList.indexOf(productId);
            if (index !== -1) {
                user.wishList.splice(index, 1);
                await user.save();
                return res.status(200).json({ message: 'Product removed from wishlist', wishList: user.wishList });
            } else {
                return res.status(404).json({ message: 'Product not found in wishlist' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
