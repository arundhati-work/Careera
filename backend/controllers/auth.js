const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "fdghsdfhsk4953465!&*^(@$ehfwelrh43480"; // move to .env

const registerUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User already registered"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: "User registered"});
    } catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if (!existingUser){
            return res.status(404).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = await jwt.sign({id: existingUser._id}, JWT_SECRET, {expiresIn: "1h"});
        res.json({
            token,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        });
    } catch(err) {
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {
    registerUser,
    loginUser
};