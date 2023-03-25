"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const mongoose = require("mongoose");
const verifyUser = require("./auth/auth");
// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3001',
//   clientID: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
//   issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com'
// };
// app.use(auth(config));

app.use(cors());
app.use(express.json());
app.use(verifyUser);

const PORT = process.env.PORT || 3001;
DATABASE_URL=process.env.DATABASE_URL;

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
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
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

const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Connected to MongoDB and listening on ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });


// app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
// const newUser = {
//   id: "reed",
//   email: "readvogt@gmail.com",
//   password: "Olivervogt1",
// };

// createUser(newUser);
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// async function createUser(user) {
//   const uri = process.env.DATABASE_URL;
//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const usersCollection = client.db("myDatabase").collection("users");

//     // Hash the password before storing it in the database
//     user.password = await bcrypt.hash(user.password, saltRounds);

//     const result = await usersCollection.insertOne(user);
//     console.log("User inserted with ID:", result.insertedId);
//     await client.close();
//   } catch (error) {
//     console.error(error);
//   }
// }

// const jwt = require("jsonwebtoken");
// const users = require("./login-info.json");

// const { MongoClient } = require("mongodb");


// async function fetchMongoData() {
//   const uri = process.env.DATABASE_URL;
//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const collection = client.db("<DATABASE_NAME>").collection("<COLLECTION_NAME>");
//     const data = await collection.findOne({}, { projection: { _id: 1 } });
//     await client.close();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }


//   var config = {
//     method: "post",
//     url: "https://us-east-2.aws.data.mongodb-api.com/app/data-pyokt/endpoint/data/v1/action/findOne",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Request-Headers": "*",
//       "api-key": "0iO2VSe1GaISEf4uOH6ksrDOXBOwhSTfLCqDSVJ7pThsJQ7SbCj3xDQBvyvFZzKn",
//     },
//     data: data,
//   };

//   try {
//     const response = await axios(config);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// app.get("/mongo-data", async (req, res) => {
//   const mongoData = await fetchMongoData();
//   if (mongoData) {
//     res.json(mongoData);
//   } else {
//     res.status(500).json({ message: "Error fetching data from MongoDB" });
//   }
// });
// function generateToken(user) {
// const payload = {
// id: user.id,
// email: user.email,
// };

// const secret = process.env.SECRET_KEY; 
// const options = { expiresIn: "1h" }; 

// return jwt.sign(payload, secret, options);
// }

// function authenticateUser(email, password) {
// const user = users.find((user) => user.email === email);

// if (user && user.password === password) {
// return user;
// }

// return null;
// }

// async function verifyToken(req, res, next) {
// const authHeader = req.headers.authorization;
// const token = authHeader && authHeader.split(" ")[1];

// if (!token) {
// return res.status(403).json({ message: "No token provided" });
// }

// try {
// const decoded = jwt.verify(token, process.env.SERVER_KEY);
// req.user = decoded;
// next();
// } catch (error) {
// res.status(401).json({ message: "Invalid token" });
// }
// }

// app.get("/api/user", verifyToken, async (req, res) => {
// const user = users.find((user) => user.id === req.user.id);

// if (!user) {
// return res.status(404).json({ message: "User not found" });
// }

// try {
// const response = await axios.get(`${process.env.REACT_APP_SERVER}/users/${req.user.id}`);
// const userData = response.data;
// res.json({
// id: userData.id,
// email: user.email,
// name: userData.name,
// phone: userData.phone
// });
// } catch (error) {
// console.error(error);
// res.status(500).json({ message: "Server Error" });
// }
// });