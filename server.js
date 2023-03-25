"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");
const verifyUser = require("./auth/authorize");
app.use(cors());

app.use(express.json());
app.use(verifyUser);
const PORT = process.env.PORT || 3002;
const DATABASE_URL = process.env.DATABASE_URL;

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

app.get("/projects.json", (req, res) => {
  res.send(projects);
});

app.get("/profile.json", (req, res) => {
  res.send(profile);
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

app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
});

mongoose.connect(DATABASE_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Connected to mongodb and listening on ${PORT}`));
    })
    .catch((error) => {
        console.log(error);
    });
// mongoose
//   .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Connected to MongoDB and listening on ${PORT}`));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
