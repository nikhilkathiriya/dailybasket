const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    postcode: {type: String, default: null},
    paymentDetails: {
        cardHolder: {type: String, default: null},
        cardNumber: {type: Number, default: null},
        expiryDate: {type: Number, default: null},
        cvv: {type: Number, default: null},
    },
    tempPass: {type: Number, default: null},
    tempExpiry: { type: Date, default: null},
    wishList: [{
        type: Number,
        required: false
    }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
