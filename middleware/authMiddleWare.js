const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const { promisify } = require("util");

// Create a JWKS (JSON Web Key Set) client that fetches public keys from the Auth0 server
const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

// Function to get the public key for verifying JWT tokens
function getKey(header, callback) {
  // Retrieve the signing key for the provided "kid" (key ID) from the JWKS endpoint
  client.getSigningKey(header.kid, (err, key) => {
    // Extract the public key from the signing key
    const signingKey = key.publicKey || key.rsaPublicKey;
    // Pass the public key to the callback
    callback(null, signingKey);
  });
}

// Promisify the JWT verification function to make it easier to use with async/await
const jwtVerify = promisify(jwt.verify);

// Define the authentication middleware function
async function authMiddleware(req, res, next) {
  // Extract the JWT token from the "Authorization" header
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    // If no token is provided, return a 401 Unauthorized response
    return res.status(401).send("No token provided.");
  }

  try {
    // Verify the JWT token using the public key
    const decoded = await jwtVerify(token, getKey, {
      audience: process.env.AUTH0_AUDIENCE, // Replace with the correct Auth0 audience (API Identifier)
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ["RS256"], // Use the RS256 algorithm for JWT signature verification
    });

    // If the token is valid, add the decoded payload to the request object and call the next middleware function
    req.user = decoded;
    next();
  } catch (err) {
    // If the token is invalid, return a 401 Unauthorized response
    console.error(err);
    return res.status(401).send("Invalid token.");
  }
}

module.exports = authMiddleware;
