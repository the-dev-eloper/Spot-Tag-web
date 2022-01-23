
const express = require('express');
require('dotenv/config');
const morgan = require('morgan');

const app = express();
const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/");
});
