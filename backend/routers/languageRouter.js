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
            developer: 'sample developer',
            stableRelease: 'sample stable release',
            firstAppeared: 'sample data',
            image: '/images/l1.png',
            bugList: [],
        });

        const createdLanguage = await language.save();
        res.send({ message: 'Language Created', language: createdLanguage });
    })
);

languageRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

        const languageId = req.params.id;
        const language = await Language.findById(languageId);

        if(language) {
            language.name = req.body.name;
            language.image = req.body.image;
            language.developer = req.body.developer;
            language.stableRelease = req.body.stableRelease;
            language.firstAppeared = req.body.firstAppeared;
            language.bugList = req.body.bugList;

            const updatedLanguage = await language.save();
            res.send({ message: 'Language Updated', language: updatedLanguage });
        } else {
            res.status(404).send({ message: 'Language Not Found' });
        }
    })
);

languageRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

        const languageId = req.params.id;
        const language = await Language.findById(languageId);

        if(language) {
            const deletedLanguage = await language.remove();
            res.send({ message: 'Language Deleted', language: deletedLanguage });
        } else {
            res.status(404).send({ message: 'Language Not Found' });
        }
    })
)

export default languageRouter;