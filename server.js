"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// const getGithub = require("./modules/github");

// app.get("/github", getGithub);


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
