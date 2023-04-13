// Load dependencies
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
// const profileData = require('./routes/api/myprofile.js');
const ejs = require("ejs");

// Import routes
const webRoutes = require("./routes/webRoutes");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");

// app.get("/myprofile", apiRoutes);

// Configure dotenv
dotenv.config();

// Create Express app
const app = express();

// app.get("/api/myprofile", profileData);

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// SECTION 1: Middleware Configuration
// ===============================================================================

// Cors middleware to enable Cross-origin resource sharing
app.use(cors());

// Morgan logger middleware for development logs
app.use(logger("dev"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Body parsing middleware for JSON requests
app.use(express.json());

// SECTION 2: Auth0 Configuration
// ===============================================================================

// Use Auth0 routes defined in authRoutes
app.use(authRoutes);
// app.use('/api', config);
app.use("/api", apiRoutes);
// SECTION 3: Route Handlers
// ===============================================================================

// Use routes defined in the separate routes file
app.use(webRoutes);

// app.use("/api", apiRoutes);

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Protected route for getting user data
// app.get("/users/:userId", authMiddleware, (req, res) => {
//   const userId = req.params.userId;

//   // Fetch user data from Auth0 or your database based on userId
//   // Example: const userData = await getUserDataFromAuth0(userId);

//   if (!userData) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(userData);
// });

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

// SECTION 4: MongoDB Connection and Server Start
// ===============================================================================

// Connect to MongoDB and start server
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
