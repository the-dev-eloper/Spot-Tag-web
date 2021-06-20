import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Bug from '../models/bugModel.js';
import { isAdmin, isAuth } from '../utils.js';

const bugRouter = express.Router();

bugRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const bugs = await Bug.find({});
        res.send(bugs);
    })
);

bugRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Bug.remove({});
        const createdBugs = await Bug.insertMany(data.bugs);
        res.send({ createdBugs });
    })
);

bugRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const bug = await Bug.findById(req.params.id);
        if(bug) {
            res.send(bug);
        } else {
            res.status(404).send({ message: 'Bug Not Found' });
        }
    })
);

bugRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const bug = new Bug({
            name: 'sample name' + Date.now(),
            category: 'sample category',
            language: 'sample language',
            reason: 'sample reason',
            testingTool: 'sample testingTool',
            solution: 'sample solution',
            refLink: 'sample refLink',
            addedBy: 'Admin'
        });

        const createdBug = await bug.save();
        res.send({ message: 'Language Bug', language: createdBug });
    })
);

export default bugRouter;