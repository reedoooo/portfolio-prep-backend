// Load dependencies
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const ejs = require("ejs");

// Configure dotenv
dotenv.config();

// Import routes
const webRoutes = require("./routes/webRoutes");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");



// Create Express app
const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware Configuration
app.use(cors());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Auth0 Configuration
app.use("/", authRoutes);
app.use("/api", apiRoutes);

// Route Handlers
app.use(webRoutes);

// Configure user object for views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// Handle 404 errors
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Handle other errors
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
