
const express = require('express');
const { User } = require('../models/userModel');

const userRouter = express.Router();

userRouter.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');
    res.send(userList);
});

userRouter.post(`/`, async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        passwordHash: req.body.passwordHash,
    });

    const createdUser = await newUser.save();

    if(createdUser) {
        res.status(201).json(createdUser)
    } else {
        res.status(500).json({
            error: err,
            success: false
        })
    }
});

module.exports = userRouter;
