// Load dependencies
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { requiresAuth } = require('express-openid-connect');

// Configure dotenv
dotenv.config();

// Import routes
const webRoutes = require("./routes/webRoutes");
const myProfileRoutes = require("./routes/api/myProfileRoutes"); 
const myTabRoutes = require("./routes/api/myTabRoutes"); 
const myTodoRoutes = require("./routes/api/myTodoRoutes");
const myNotesRoutes = require("./routes/api/myNotesRoutes");
// const myTcgPlayerRoutes = require("./routes/api/myTcgPlayerRoutes");

// const authRoutes = require("./routes/auth/authRoutes");

const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});


// Middleware Configuration
app.use(cors());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Route Handlers
app.use("/api", myProfileRoutes);
app.use("/api", myTabRoutes); 
app.use("/api", myTodoRoutes); 
app.use("/api", myNotesRoutes); 
// app.use("/api", myTcgPlayerRoutes);

// app.use("/", authRoutes);

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use(webRoutes);

app.post("/oauth/token", async (req, res) => {
  try {
    const options = {
      method: "POST",
      url: "https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      data: {
        authRequired: false,
        auth0Logout: true,
        // Replace the values with your actual client_id, client_secret, etc.
        "client_id": "pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn",
        "client_secret": "X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC",
        "audience": "https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/",
        "grant_type": "client_credentials",
      },
    };

    const response = await axios(options);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: "Error fetching token", error });
  }
});

// Handle 404 errors
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Handle 500 errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

// MongoDB Connection and Server Start
const DATABASE_URL = process.env.DATABASE_URL;
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to MongoDB and listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
