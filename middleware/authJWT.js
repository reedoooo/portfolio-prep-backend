const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const secret = 'mysecret'; // Replace with a strong secret for production use

// Generate a JWT token with a payload
app.get('/generate-token', (req, res) => {
  const payload = { userId: 123 };
  const token = jwt.sign(payload, secret);
  res.json({ token });
});

// Verify a JWT token and return the payload
app.get('/verify-token', (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const payload = jwt.verify(token, secret);
    res.json({ payload });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
