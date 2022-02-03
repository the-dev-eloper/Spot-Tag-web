
const express = require('express');
const { Language } = require("../models/languageModel");
const multer = require('multer');

const languageRouter = express.Router();

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid File Type');

        if(isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },

    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];

        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});

const uploadOptions = multer({ storage: storage });

languageRouter.get(`/`, async (req, res) => {
    const languageList = await Language.find({});
    res.send(languageList);
});

languageRouter.get(`/:id`, async (req, res) => {
    const language = await Language.findById(req.params.id);
    res.send(language);
});

languageRouter.post(`/`, uploadOptions.single('image'), async (req, res) => {

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const language = new Language({
        name: req.body.name,
        image: `${basePath}${fileName}`,
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

    if(!updatedLanguage) return res.status(404).send('Language not Found!');

    res.send(updatedLanguage);
});

languageRouter.delete(`/:id`, async (req, res) => {
    const language = await Language.findById(req.params.id);
    if(!language) return res.status(400).send('Invalid Language');

    Language.findByIdAndDelete(req.params.id)
        .then((deletedLanguage) => {
            if(deletedLanguage) {
                return res.status(201).json({ success: true, message: 'Deleted Successfully' })
            } else {
                return res.status(404).json({ success: false, message: 'Language not found' })
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err })
        })
});

module.exports = languageRouter;
