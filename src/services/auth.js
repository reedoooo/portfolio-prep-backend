// services.js
const Users = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const { validatePassword, createToken } = require('../utils/utils');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  console.log('Bearer Header:', bearerHeader);

  if (!bearerHeader) {
    return res.status(403).send({ message: 'No token provided' });
  }

  // Split at the space
  const bearer = bearerHeader.split(' ');
  // Get token from array
  const token = bearer[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    req.authData = decoded;
    next();
  });
};

const findUser = async (username) => {
  return await Users.findOne({ 'login_data.username': username });
};

module.exports = {
  verifyToken,
  findUser,
  validatePassword,
  createToken,
};

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const SECRET_KEY = process.env.SECRET_KEY;
// const Users = require("../models/UserSchema");

// const verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   console.log("Bearer Header:", bearerHeader);

//   if (!bearerHeader) {
//     return res.status(403).send({ message: "No token provided" });
//   }

//   // Split at the space
//   const bearer = bearerHeader.split(" ");
//   // Get token from array
//   const token = bearer[1];

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorized!" });
//     }

//     req.authData = decoded;
//     next();
//   });
// };

// const findUser = async (username) => {
//   return await Users.findOne({ "login_data.username": username });
// };

// const validatePassword = async (password, hashedPassword) => {
//   return await bcrypt.compare(password, hashedPassword);
// };

// const createToken = (payload) => {
//   return jwt.sign(payload, SECRET_KEY);
// };

// module.exports = {
//   verifyToken,
//   findUser,
//   validatePassword,
//   createToken,
// };
