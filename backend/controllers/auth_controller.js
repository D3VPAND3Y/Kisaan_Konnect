const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model.js");
const zod = require("zod");
const bcrypt = require('bcryptjs');

const userRoute = express.Router();

// Define Zod Schemas
const signupBody = zod.object({
    fullName: zod.string().min(1, "Full name is required"),
    useremail: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

const signinBody = zod.object({
    useremail: zod.string().email("Invalid email format"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

// Signup Route
userRoute.post("/signup", async (req, res) => {
    const validationResult = signupBody.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(411).json({
            message: "Validation failed",
            errors: validationResult.error.errors.map(err => err.message),
        });
    }

    try {
        const user = new User({
            fullName: req.body.fullName,
            useremail: req.body.useremail,
            password: await bcrypt.hash(req.body.password, 10),
        });

        await user.save();

        const token = jwt.sign(
            {
                userId: user._id,
                email: req.body.useremail,
                fullName: user.fullName
            },
            process.env.JWT_SECRET
        );

        res.json({
            message: "User created successfully",
            token: token,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(411).json({
                message: "Validation failed",
                errors: errors
            });
        }

        if (error.code === 11000) {
            return res.status(411).json({
                message: "Email already taken",
            });
        }
        console.log(error);

        return res.status(500).json({
            message: "Server error",
        });
    }
});

// Signin Route
userRoute.post("/signin", async (req, res) => {
    const validationResult = signinBody.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(411).json({
            message: "Validation failed",
            errors: validationResult.error.errors.map(err => err.message),
        });
    }

    try {
        const user = await User.findOne({ useremail: req.body.useremail });

        if (!user) {
            return res.status(411).json({
                message: "Email not available.",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(411).json({
                message: "Incorrect password.",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: req.body.useremail,
                fullName: user.fullName,
            },
            process.env.JWT_SECRET
        );

        res.json({
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
});

// Dummy OTP Route
userRoute.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ useremail: email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const otp = '123456';
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        res.json({ message: `OTP is 123456. You can now proceed to verify.` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify OTP and Reset Password Route
userRoute.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ useremail: email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = {
    userRoute
};
