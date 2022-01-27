
const e = require('express');
const express = require('express');
const { Language } = require("../models/languageModel");

const languageRouter = express.Router();

languageRouter.get(`/`, async (req, res) => {
    const languageList = await Language.find({});
    res.send(languageList);
});

languageRouter.get(`/:id`, async (req, res) => {
    const language = await Language.findById(req.params.id);
    res.send(language);
});

languageRouter.post(`/`, async (req, res) => {
    const language = new Language({
        name: req.body.name,
        image: req.body.image,
        developer: req.body.developer,
        stableRelease: req.body.stableRelease,
        firstAppeared: req.body.firstAppeared,
        languageParadigm: req.body.languageParadigm,
        bugList: req.body.bugList
    });

    const createdLanguage = await language.save();

    if(createdLanguage) {
        res.status(201).json(createdLanguage)
    } else {
        res.status(500).json({
            error: err,
            success: false
        })
    }
});

languageRouter.put(`/:id`, async (req, res) => {
    const language = await Language.findById(req.params.id);
    if(!language) return res.status(400).send('Invalid Language');

    const updatedLanguage = await Language.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            developer: req.body.developer,
            stableRelease: req.body.stableRelease,
            firstAppeared: req.body.firstAppeared,
            languageParadigm: req.body.languageParadigm,
            bugList: req.body.bugList
        }
    )

    if(!updatedLanguage) {
        res.status(404).send('Language not Found!');
    }

    res.send(updatedLanguage);
});

module.exports = languageRouter;
