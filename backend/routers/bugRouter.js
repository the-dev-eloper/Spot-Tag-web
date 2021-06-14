import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Bug from '../models/bugModel.js';

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

export default bugRouter;