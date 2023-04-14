const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

// Profile route
router.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', {
    user: req.oidc.user,
  });
});

module.exports = router;
