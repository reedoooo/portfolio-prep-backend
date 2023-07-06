
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Assuming these paths are correct and that they're exporting the right things.
const Users = require('../../../models/UserSchema');
const MyProfile = require('../../../models/ProfileInfoSchema');
const { verifyToken } = require('../auth.js'); 

router.post('/', verifyToken, async (req, res) => {
  const { username, password } = req.body.auth;
  
  const user = Users.find(u => u.username === username);

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

router.get("/myProfileRoutes", verifyToken, async (req, res) => {
  console.log('myProfileRoutes working');

  try {
    const myProfile = await MyProfile.find({});

    res.status(200).json(myProfile); 
    console.log(myProfile[0]); 
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...');
  }
});

router.post('/signup', async (req, res) => {
  const { username, password, ...otherInfo } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = new Users({
      username,
      password: hashedPassword,
      ...otherInfo
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ username: user.username, id: user._id }, SECRET_KEY);

  return res.json({ token });
});

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await Users.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user data' });
  }
});

router.put('/me', verifyToken, async (req, res) => {
  const updates = req.body;

  try {
    const user = await Users.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user data' });
  }
});

router.delete('/me', verifyToken, async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;