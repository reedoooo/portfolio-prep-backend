const express = require("express");
const router = require("express").Router();
const profileData = require("./api/myprofile");

// Profile data route (using middleware)
router.use("/", profileData);

// If no API routes are hit, send the React app to index.html
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
