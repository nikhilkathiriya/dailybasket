const bcrypt = require('bcrypt');

// Function to hash password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Number of salt rounds for hashing
        return  await bcrypt.hash(password, saltRounds);
    } catch (err) {
        throw new Error('Error hashing password');
    }
};

// Function to compare plain password with hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return  await bcrypt.compare(plainPassword, hashedPassword);
    } catch (err) {
        throw new Error('Error comparing passwords');
    }
};

module.exports = { hashPassword, comparePassword };
