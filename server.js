"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const projects = require("./projects.json");
const profile = require("./profile.json");
const pdf = require("./reedVogtResume.pdf");

const jwt = require("jsonwebtoken");
const users = require("./login-info.json");

app.get("/projects.json", (req, res) => {
  res.send(projects);
});

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const secret = "sasuke"; // Replace with your own secret key
  const options = { expiresIn: "1h" }; // Set the token's expiration time

  return jwt.sign(payload, secret, options);
}
console.log(user);
console.log(user.id);

function authenticateUser(email, password) {
  const user = users.find((user) => user.email === email);

  if (user && user.password === password) {
    return user;
  }

  return null;
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/api/user", verifyToken, (req, res) => {
  const user = users.find((user) => user.id === req.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
  });
});

app.get("/projects.json", (req, res) => {
  res.send(projects);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = authenticateUser(email, password);

  if (user) {
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      token: token,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

app.get("/reedVogtResume.pdf", (req, res) => {
  res.send(pdf);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Server Error");
});

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
