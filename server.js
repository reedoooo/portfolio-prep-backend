// Load dependencies
const dotenv = require('dotenv');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const routes = require("./routes");
const cors = require('cors');
const mongoose = require('mongoose');
// const myProfileMiddleware = require("./middleware/myProfileMiddleware");
// const authMiddleware = require("./middleware/authMiddleWare");
const { auth } = require('express-openid-connect');
const ejs = require('ejs');

// Configure dotenv
dotenv.config();

// Create Express app
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SECTION 1: Middleware Configuration
// ===============================================================================

// Cors middleware to enable Cross-origin resource sharing
app.use(cors());

// Morgan logger middleware for development logs
app.use(logger('dev'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware for JSON requests
app.use(express.json());

// SECTION 2: Auth0 Configuration
// ===============================================================================

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
  issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com',
  secret: 'X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC',
  routes: {
    callback: '/callback'
  }
};

// Set baseURL if not set
if (!config.baseURL && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${process.env.PORT}`;
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


// SECTION 3: Route Handlers
// ===============================================================================

// Use routes defined in the separate routes file
app.use(routes);

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
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
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
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
      console.log(`Connected to MongoDB and listening on ${config.baseURL}`);
});
})
.catch((error) => {
console.log(error);
});
