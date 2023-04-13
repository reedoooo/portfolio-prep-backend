const express = require('express');
const { auth } = require('express-openid-connect');

const router = express.Router();

console.log('Auth0 Config:', process.env.AUTH0_CLIENT_ID, process.env.AUTH0_ISSUER_BASE_URL, process.env.AUTH0_SECRET);


// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL || 'http://localhost:3001',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  secret: process.env.AUTH0_SECRET,
  routes: {
    callback: '/callback'
  }
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

module.exports = router;
