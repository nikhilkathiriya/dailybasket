const mongoose = require('mongoose');

// MongoDB URI

const uri = process.env.MONGO_URI

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected with Mongoose');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the application on failure
    }
};

module.exports = connectDB; // Export the connection function
