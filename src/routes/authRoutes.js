import express from 'express';
import User from '../models/User.js';

const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error saving user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received Email:', email);
    console.log('Received Password:', password);

    try {
        const user = await User.findOne({ email });

        // Log the user found (or not)
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Found User:', user);

        if (user.password !== password) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;
