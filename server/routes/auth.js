const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } =req.body;

        //Check if user exists
        let user = await User.findOne({ email});
        if (user) {
            return res.status(400).json({ error: 'User already exists'});
        }

        //Create User
        user = new User({name, email, password});
        await user.save();

        //Generate token
        const token=jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your secret key',
            {expiresIn: '7d'}
        );

        res.status(201).json({
            user: {id: user._id, name, email},
            token

        });
    } catch (error){
        res.status(500).json({ error: error.message});
        
    }
});

//Login
router.post('/login', async (req, res)=> {
    try{
        const { email, password}= req.body;

        //Find user
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid credentials' });
        }

        //Generate token
        const token=jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your secret key',
            {expiresIn: '7d'}
        );

         res.json({ 
      user: { id: user._id, name: user.name, email },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

module.exports=router