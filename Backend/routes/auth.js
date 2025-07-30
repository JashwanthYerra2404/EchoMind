import express from "express";
import User from "../models/Thread.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async(req, res) => {
    const { username, email, password } = req.body;
    try{
        if(!username || !email || !password){
            return res.status(400).json({ error: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if(password.length < 6){
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email: email });
        if(existingUser){
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await User.create({ username, email, password });

        const token = jwt.sign({ userid: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        });

        res.status(201).json({ success: 'User created successfully', newUser });
    }
    catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        });

        res.status(200).json({ success: 'Login successful' });
    }
    catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;