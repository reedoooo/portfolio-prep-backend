const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

function verifyUser(request, response, next) {

    function valid(err, user) {
        console.log('***********USER***********');
        console.log(user);
        request.user = user;
        next();
    }

    console.log('*************************VERIFY USER******************************')

    try {
        const token = request.headers.authorization.split(' ')[1];
        console.log('**********HEADER**********');
        console.log(request.headers);
        console.log('***********AUTH***********')
        console.log(request.header.authorization);
        console.log('**********TOKEN*********');
        console.log(token);
        jwt.verify(token, getKey, {}, valid);
    } catch (error) {
        console.error(error);
        next('Not Authorized');
    }
}


// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                                                      //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
    // this url comes from your app on the auth0 dashboard
    jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

module.exports = verifyUser;

// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

// class NotAuthorizedError extends Error {
//     constructor() {
//         super('Not Authorized');
//         this.statusCode = 401;
//     }
// }

// function verifyUser(request, response, next) {

//     function valid(err, user) {
//         if (err) { // Added error check
//             console.error(err);
//             return next(new NotAuthorizedError());
//         }

//         console.log('***********USER***********');
//         console.log(user);
//         request.user = user;
//         next();
//     }

//     console.log('*************************VERIFY USER******************************');

//     try {
//         if (request.headers.authorization) {
//             const parts = request.headers.authorization.split(' ');

//             if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
//                 const token = parts[1];
//                 console.log('**********HEADER**********');
//                 console.log(request.headers);
//                 console.log('***********AUTH***********');
//                 console.log(request.headers.authorization);
//                 console.log('**********TOKEN*********');
//                 console.log(token);
//                 jwt.verify(token, getKey, {}, valid);
//             } else {
//                 next(new NotAuthorizedError());
//             }
//         } else {
//             next(new NotAuthorizedError());
//         }
//     } catch (error) {
//         console.error(error);
//         next(new NotAuthorizedError());
//     }
// }

// const client = jwksClient({
//     jwksUri: process.env.JWKS_URI,
// });

// function getKey(header, callback) {
//     client.getSigningKey(header.kid, function (err, key) {
//         if (err) {
//             callback(err);
//         } else {
//             const signingKey = key.publicKey || key.rsaPublicKey;
//             callback(null, signingKey);
//         }
//     });
// }

// module.exports = verifyUser;
