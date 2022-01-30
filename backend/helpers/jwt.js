
const expressJwt = require('express-jwt');

function authJwt() {
    const myCodeSecret = process.env.JWT_SECRET;

    return expressJwt({
        secret: myCodeSecret,
        algorithms: ['HS256'],
    });
}

module.exports = authJwt;
