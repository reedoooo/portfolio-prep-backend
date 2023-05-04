const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json()); // Parse JSON request bodies
console.log('jwt accessed')

// Replace this function with your actual implementation to validate user credentials
function validateUserCredentials(email, password) {
  // Return true if the email and password are correct, false otherwise
  return email === 'user@example.com' && password === 'user_password';
}
// JWT secret key - this should be kept private and secure
const jwtSecret = 'X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC';

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (validateUserCredentials(email, password)) {
    // If the credentials are valid, create and sign a JWT token
    const payload = { email };
    const expiresIn = '1h'; // Token expiration time
    const token = jwt.sign(payload, jwtSecret, { expiresIn });

    res.json({ token }); // Send the token to the client
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: '{https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/}',
  issuerBaseURL: `https://dev-eq6zzpz5vj8o8v17.us.auth0.com`,
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = requiredScopes('read:messages');
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
