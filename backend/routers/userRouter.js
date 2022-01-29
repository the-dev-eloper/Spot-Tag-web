
const express = require('express');
const { User } = require('../models/userModel');

const userRouter = express.Router();

userRouter.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');
    res.send(userList);
});

module.exports = userRouter;
