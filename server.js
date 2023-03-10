"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// const getGithub = require("./modules/github");
// const getProjects = require("./modules/projects");
const projects = require("./projects.json");
const profile = require("./profile.json");

// app.get("/github", getGithub);
// app.get("/projects", getProjects);

// app.get("/profile", getProfile);
// app.get("/projects", getProjects);
app.get("/projects", (req, res) => {
  res.status(200).send(projects);
});

app.get("/profile", (req, res) => {
  res.status(200).send(profile);
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
