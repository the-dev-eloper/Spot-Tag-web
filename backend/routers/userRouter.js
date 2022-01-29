
const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models/userModel');

const userRouter = express.Router();

userRouter.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash -password');
    res.send(userList);
});

userRouter.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash -password');

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ success: false, message: 'User not Found!'});
    }
});

userRouter.post(`/`, async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
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

userRouter.put(`/:id`, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        passwordHash: req.body.passwordHash,
    });

    if(updatedUser) {
        res.status(200).send(updatedUser);
    } else {
        res.status(404).json({ success: false, message: 'User not Found!' });
    }
});

module.exports = userRouter;
