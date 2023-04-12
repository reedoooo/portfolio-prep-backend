const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const morgan = require('morgan');
const { auth, requiresAuth } = require('express-openid-connect');
const { options } = require('./config');
const router = require("express").Router();
const profileData = require("../middleware/myProfileMiddleware");

// Initialize the express app
const app = express();

// Use Helmet for added security
app.use(helmet());

// Use morgan for HTTP request logging
app.use(morgan('combined'));

// Add express-session middleware
app.use(
  session({
    secret: options.sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);

// Add OpenID Connect middleware
app.use(auth(options));

// Set Handlebars as the default templating engine
app.engine('.hbs', exphbs({ extname: '.hbs' }));

app.set('view engine', '.hbs');

// Set up static asset serving
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================================
// Home route
app.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

// ============================================================================
// Profile route
app.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', {
    user: req.oidc.user,
  });
});

// ============================================================================
// API routes
app.use('/api', require('./routes/api'));

// ============================================================================
// Profile data route (using middleware)
router.use("/myprofile", profileData);

// ============================================================================
// If no API routes are hit, send the React app to index.html
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ============================================================================
// Export the router
module.exports = router;
