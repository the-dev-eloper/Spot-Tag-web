
const expressJwt = require('express-jwt');

const myCodeSecret = process.env.JWT_SECRET;

function authJwt() {
    return expressJwt({
        secret: myCodeSecret,
        algorithms: ['HS256'],
    });
}

module.exports = authJwt;
