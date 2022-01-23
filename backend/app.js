
const express = require('express');
require('dotenv/config');

const app = express();
const api = process.env.API_URL;

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000/");
});
