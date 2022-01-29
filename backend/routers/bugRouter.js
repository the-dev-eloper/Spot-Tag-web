
const express = require('express');
const { Bug } = require("../models/bugModel");

const bugRouter = express.Router();

bugRouter.get(`/`, async (req, res) => {
    const bugs = await Bug.find({});
    res.send(bugs);
});

bugRouter.get(`/:id`, async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    res.send(bug);
});

module.exports = bugRouter;
