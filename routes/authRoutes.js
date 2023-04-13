const express = require('express');
const { auth } = require('express-openid-connect');

const router = express.Router();

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
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;
