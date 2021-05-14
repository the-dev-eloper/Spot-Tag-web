import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Language from '../models/languageModel.js';


const languageRouter = express.Router();

languageRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const languages = await Language.find({});
        res.send(languages);
    })
);

languageRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdLanguages = await Language.insertMany(data.languages);
        res.send({ createdLanguages });
    })
);

languageRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const language = await Language.findById(req.params.id);

        if (language) {
            res.send(language);
        } else {
            res.status(404).send({ message: 'Language Not Found' });
        }
    })
);

export default languageRouter;