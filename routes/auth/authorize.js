const jwt = require("express-jwt");

const authorize = (req, res, next) => {
  console.log('authorize accessed')
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authorization header is missing or malformed." });
  } else {
    console.log('Token found')
  }

  jwt.verify(token, "X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC", (err, decoded) => {
    console.log('Token verified')
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    
console.log('Token decoded')
    req.user = decoded;
    next();
  });
};

module.exports = authorize;

// const jwksRsa = require('jwks-rsa');
// const jwt = require("jsonwebtoken");

// const authorize = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),

//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });

// module.exports = authorize;


// const jwt = require("jsonwebtoken");
// const jwksClient = require("jwks-rsa");

// async function verifyUser(request, response, next) {
//   console.log("authorization accessed");

//   // Validate the Authorization header
//   const authHeader = request.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return response.status(401).json({ message: "Unauthorized request" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("**********TOKEN*********");
//   console.log(token);

//   try {
//     // Use async/await instead of callbacks
//     const { header, payload } = await jwt.verify(token, getKey, {});

//     console.log("**********HEADER**********");
//     console.log(header);
//     console.log("***********PAYLOAD***********");
//     console.log(payload);

//     // Save the verified user to the request object
//     request.user = payload.sub;

//     next();
//   } catch (error) {
//     console.error(error);
//     // Return an error response if verification fails
//     response.status(401).json({ message: "Invalid token" });
//   }
// }

// // Define a client to retrieve the public key from the JWKS endpoint
// const client = jwksClient({
//   jwksUri: process.env.JWKS_URI,
// });

// // Get the public key for a given JWT header
// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     const signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// module.exports = verifyUser;
