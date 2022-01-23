
const express = require('express');
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

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
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/");
});
