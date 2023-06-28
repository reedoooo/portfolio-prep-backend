const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
// const verifyUser = require('../auth/authorize.js');
const router = express.Router();

// In-memory user database
let users = [
  // Plain password should be hashed in real situations
  { username: 'reedthahuman', password: bcrypt.hashSync('password', 10), capabilities: ['read', 'write', 'delete', 'create'] },
  // Add more users as needed
];

const SECRET_KEY = process.env.SECRET_KEY; // Please use a more secure key in real situations


router.post('/', async (req, res) => {
  const { username, password } = req.body.auth;
  
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ username: user.username, capabilities: user.capabilities }, SECRET_KEY);

  return res.json({ token });
});

module.exports = router;