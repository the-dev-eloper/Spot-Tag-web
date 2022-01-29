
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

bugRouter.post(`/`, async (req, res) => {
    const bug = new Bug({
        name: req.body.name,
        language: req.body.language,
        category: req.body.category,
        reason: req.body.reason,
        testingTool: req.body.testingTool,
        solution: req.body.solution,
        refLink: req.body.refLink,
        addedBy: req.body.addedBy,
    });

    const createdbug = await bug.save();

    if(createdbug) {
        res.status(201).send(createdbug);
    } else {
        res.status(500).send({
            error: err,
            success: false
        })
    }
});

bugRouter.put(`/:id`, async (req, res) => {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        language: req.body.language,
        category: req.body.category,
        reason: req.body.reason,
        testingTool: req.body.testingTool,
        solution: req.body.solution,
        refLink: req.body.refLink,
        addedBy: req.body.addedBy,
    });

    if(!updatedBug) return res.status(404).send('Bug not Found!');

    res.send(updatedBug);
});

bugRouter.delete(`/:id`, async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    if(!bug) return res.status(404).send('Bug not Found');

    Bug.findByIdAndDelete(req.params.id)
        .then((deletedBug) => {
            if(deletedBug) {
                return res.status(201).json({ success: true, message: 'Deleted Successfully' })
            } else {
                return res.status(404).json({ success: false, message: 'Bug not found' })
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err })
        })
});

module.exports = bugRouter;
