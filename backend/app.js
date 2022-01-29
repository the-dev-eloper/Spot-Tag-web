
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');

const app = express();
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

app.use(cors());
app.options('*', cors());

// Routers
const languageRouter = require('./routers/languageRouter');
const bugRouter = require('./routers/bugRouter');

app.use(`${api}/languages`, languageRouter);
app.use(`${api}/bugs`, bugRouter);

// Database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'spottag-web'
})
    .then(() => {
        console.log('Database connection is ready..');
    })

    .catch((err) => {
        console.log(err);
    })

// Server
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000/");
});
