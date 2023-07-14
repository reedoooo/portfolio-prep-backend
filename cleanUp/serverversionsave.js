// Load dependencies
// const dotenv = require('dotenv');
// const express = require('express');
// const logger = require('morgan');
// const path = require('path');
// const router = require('./routes/index');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const profileData = require('./routes/myprofile');
// const { auth, requiresAuth } = require('express-openid-connect');
// const users = require('./routes/users')

// Configure dotenv
dotenv.config();

// Create Express app
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Auth0 configuration
const config = {
baseURL: 'http://localhost:3001',
clientID: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com',
secret: 'X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC'
};

// Define port
const port = process.env.PORT || 3001;

// Set baseURL if not set
if (!config.baseURL && port && process.env.NODE_ENV !== 'production') {
config.baseURL = `http://localhost:${port}`;
}

// Set up Auth0 middleware
app.use(auth(config));

// Define routes
app.get('/', (req, res) => {
res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.use('/users', users)
app.get('/profile', requiresAuth(), (req, res) => {
res.send(JSON.stringify(req.oidc.user));
});
app.use('/myprofile', profileData);

// Configure user object for views
app.use(function (req, res, next) {
res.locals.user = req.oidc.user;
next();
});

// Use main router
app.use('/', router);

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

// Connect to MongoDB and start server
const DATABASE_URL = process.env.DATABASE_URL;
mongoose
.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
app.listen(port, () => {
console.log(`Connected to MongoDB and listening on ${config.baseURL}`);
});
})
.catch((error) => {
console.log(error);
});