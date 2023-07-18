// DEPENDENCIES
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Configure dotenv
dotenv.config();

// Import custom middleware and routes
const applyCustomMiddleware = require('./middleware');
const routes = require('./routes');

// EXPRESS APP
const app = express();
// app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Apply middleware
applyCustomMiddleware(app);

// HANDLE ROUTES
// app.use("/api", routes);

// HANDLE ROUTES
app.use(
  '/api',
  (req, res, next) => {
    console.log(`Received request on API route: ${req.method} ${req.originalUrl}`);
    next();
  },
  routes,
);

// HANDLE ERRORS
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {},
  });
});

// MONGODB CONNECTION AND SERVER LISTENING
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to MongoDB and listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
