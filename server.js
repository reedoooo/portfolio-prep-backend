"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const projects = require("./data/projects.json");
const profile = require("./data/profile.json");

app.get("./projects.json", (req, res) => {
  res.send(projects);
});

app.get("./profile.json", (req, res) => {
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

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
