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

const PORT = process.env.PORT || 3003;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Other code...

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC',
//   baseURL: 'http://localhost:3001',
//   clientID: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
//   issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com'
// };

// const { auth } = require('express-openid-connect');
// app.use(auth(config));

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
// app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to MongoDB and listening on ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });

  // var options = {
  //   method: 'PATCH',
  //   url: 'https://{yourDomain}/api/v2/clients/{yourClientId}',
  //   headers: {
  //     'content-type': 'application/json',
  //     authorization: 'Bearer API2_ACCESS_TOKEN',
  //     'cache-control': 'no-cache'
  //   },
  //   data: {initiate_login_uri: '<login_url>'}
  // };
  
  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });