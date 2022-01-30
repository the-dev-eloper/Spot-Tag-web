
const expressJwt = require('express-jwt');

const api = process.env.API_URL;
const myCodeSecret = process.env.JWT_SECRET;

function authJwt() {
    return expressJwt({
        secret: myCodeSecret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users/register`,
            {url: /\/api\/v1\/languages(.*)/ , methods: ['GET', 'OPTIONS'] },
        ]
    });
}

module.exports = authJwt;
