const {Router} = require('express');
const User = require('../models/User');
const {hashPassword, comparePassword} = require('../utils/passwordUtils');
const {generateSixDigitCode} = require("../utils/commonFunction");
// Read the HTML template
const fs = require('fs');
const path = require('path');
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const router = Router();

// Signup API
router.post('/signup', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(403).json({message: 'All fields are required'});
        }
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Email is already exists'});
        }

        // Create a new user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});

    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
});

// Login API
router.post('/login', async (req, res) => {
    try {
        let {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({message: 'User does not exits'});
        }

        const doesPassMatch = await comparePassword(password, existingUser.password)

        if (!doesPassMatch) {
            return res.status(400).json({message: 'Incorrect email or password'});
        }
        const userDetails = existingUser.toObject();
        delete userDetails.password; // remove password from the response
        delete userDetails.tempPass // remove temparory password
        jwt.sign(userDetails, process.env.SECRETORKEY,
            // 1 year in seconds
            {expiresIn: '1y'}, (err, token) => {
                return res.status(200).json({token: "Bearer " + token, userDetails: userDetails});
            })

    } catch (e) {
        console.log('Error in login:', e)
        res.status(500).json({message: 'Server error', error: e.message});
    }
});

router.post('/verifyemail', async (req, res) => {
    try {
        let {email} = req.body;
        if (!email) {
            return res.status(403).json({message: 'Email is required'});
        }
        // Check if user exists
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(404).json({message: 'User does not exits'});
        }
        const code = generateSixDigitCode();
        existingUser.tempPass = code;
        existingUser.tempExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await existingUser.save();

        const filePath = path.join(__dirname, '../pages/resetPassword.html')
        const htmlTemplate = fs.readFileSync(filePath, 'utf-8');
        const msg = {
            to: existingUser.email,
            from: 'dailybasket247@gmail.com',
            subject: 'Password Reset Verification',
            text: `Your verification code is: ${code}`,
            html: htmlTemplate.replace('{{code}}', code),
        };
        sgMail.send(msg)
            .then(() => {
                return res.status(200).json({message: 'Verification code sent successfully'});
            })
            .catch((error) => {
                console.error(error);
                new Error('Error in send mail')
            });
    } catch (e) {
        console.log('Error in forgot password:', e)
        res.status(500).json({message: 'Server error', error: e.message});
    }
})

router.post('/verifycode', async (req, res) => {
    try {
        let {code, email} = req.body;
        code = Number(code)
        if (!code || !email) {
            return res.status(403).json({message: 'All fields are required'});
        }
        // Check if user exists
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(404).json({message: 'User does not exits'});
        }
        // Check if code has expired
        if (existingUser.tempExpiry && new Date(existingUser.tempExpiry) < new Date()) {
            return res.status(403).json({message: 'Verification code expired'});
        }

        // Check if code matches
        if (code === existingUser.tempPass) {
            // Clear tempPass and expiryAt after successful verification
            existingUser.tempPass = null;
            existingUser.expiryAt = null;
            await existingUser.save();

            return res.status(200).json({message: 'Verification successful'});
        } else {
            return res.status(403).json({message: 'Verification code is incorrect'});
        }


    } catch (e) {
        console.log('Error in forgot password:', e)
        res.status(500).json({message: 'Server error', error: e.message});
    }
})

// Reset Password API
router.post('/resetpassword', async (req, res) => {
    try {
        const {email, newPassword} = req.body;
        if (!email || !newPassword) {
            return res.status(403).json({message: 'Email and password are required'});
        }
        // Validate new password (this can include your specific password rules)
        if (newPassword.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({message: 'User does not exist'});
        }

        // Hash the new password
        // Update the user's password
        existingUser.password = await hashPassword(newPassword);
        await existingUser.save();

        res.status(200).json({message: 'Password reset successfully'});
    } catch (e) {
        console.log('Error in reset password:', e);
        res.status(500).json({message: 'Server error', error: e.message});
    }
});


module.exports = router;
