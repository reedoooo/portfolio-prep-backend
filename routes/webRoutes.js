const express = require('express');
// const { checkJwt } = require('express-jwt');
// const { checkJwt } = require('middleware/auth');

const { requiresAuth } = require('express-openid-connect');

const router = express.Router();
console.log('web accessed')

// Home route
router.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

router.get('/home', (req, res) => {
  res.render('home', {
    isAuthenticated: req.oidc.isAuthenticated(),
  });
});

// router.get('/api/myprofile', (req, res) => {
//   console.log('rendering')

//   res.render('profileData', {
//     isAuthenticated: req.oidc.isAuthenticated(),
//   });
// });

// router.get('/callback', (req, res) => {
//   res.render('callback', {
//     isAuthenticated: req.oidc.isAuthenticated(),
//   });
// });

// router.get('/productivitytab', (req, res) => {
//   res.render('productivitytab', {
//     isAuthenticated: req.oidc.isAuthenticated(),
//   });
// });

// Profile route

router.get('/myprofile', requiresAuth(), (req, res) => {
  res.render('myprofile', {
    user: req.oidc.user,
  });
  
});

// router.get('/myprofile', checkJwt, (req, res) => {
//   res.render('myprofile', {
//     user: req.oidc.user,
//   });
// });


module.exports = router;
