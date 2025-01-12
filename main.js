require('dotenv').config();

const express = require('express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./mongodb'); // Import the Mongoose connection
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const orderRoutes = require('./routes/order');
const User = require('./models/User')
const app = express();
app.use(cors());
const port = 8080;

// Setup JWT strategy
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY,
}, async (jwtPayload, done) => {
    try {
        if (jwtPayload) {
            const user = await User.findById(jwtPayload._id).lean()
            if (user) {
                return done(null, user); // User found, continue to the next middleware
            } else {
                return done(null, false); // User not found, reject the request
            }
        } else {
            return done(null, false);
        }
    } catch (e) {
        console.error('Error in JWT strategy:', e);
        return done(null, false);
    }
}));

// Middleware for parsing JSON
app.use(express.json());
app.use(bodyParser.json()); // For JSON
app.use(bodyParser.urlencoded({extended: true})); // For form data
app.use(passport.initialize());

connectDB();

// Logger Middleware to log all API calls and responses
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Routes
app.use('/api/auth', authRoutes);// Auth routes (No token check here)
app.use('/api/user', passport.authenticate('jwt', {session: false}), profileRoutes);
app.use('/api/order',passport.authenticate('jwt', {session: false}), orderRoutes)


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
