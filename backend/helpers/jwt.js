
const expressJwt = require('express-jwt');

const api = process.env.API_URL;
const myCodeSecret = process.env.JWT_SECRET;

function authJwt() {
    return expressJwt({
        secret: myCodeSecret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/users/login/`,
            `${api}/users/register`,
            {url: /\/api\/v1\/languages(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
        ]
    });
};

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
};

module.exports = authJwt;
