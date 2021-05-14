import express from 'express';
import data from './data.js'

const app = express();

app.get('/api/languages', (req, res) => {
    res.send(data.languages);
});

app.get('/api/languages/:id', (req, res) => {

    const language = data.languages.find((x) => x._id === req.params.id);

    if (language) {
        res.send(language);
    } else {
        res.status(404).send({ message: 'Language Not Found' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});