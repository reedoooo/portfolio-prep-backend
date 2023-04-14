// apiRoutes.js
const express = require("express");
const router = express.Router();

const Profile = require("../models/ProfileModel"); // Import your Profile model here

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add your other API routes here

module.exports = router;
