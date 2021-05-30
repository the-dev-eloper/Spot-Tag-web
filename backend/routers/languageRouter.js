import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Language from '../models/languageModel.js';
import { isAdmin, isAuth } from '../utils.js';

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
        // await Language.remove({});
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

languageRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const language = new Language({
            name: 'sample name' + Date.now(),
            image: '/images/l1.png',
            bugList: [],
        });

        const createdLanguage = await language.save();
        res.send({ message: 'Language Created', language: createdLanguage });
    })
);

export default languageRouter;