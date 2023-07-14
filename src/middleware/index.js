const express = require('express');
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

module.exports = function applyCustomMiddleware(app) {
    app.use(logger("dev"));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
};
