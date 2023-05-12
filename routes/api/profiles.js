// API ROUTES
const express = require("express");
const UserProfile = require("../models/UserProfileModel"); // Import your UserProfile model here

const router = express.Router();

// Personal Route for Profile Api
router.get("/profile", async (req, res) => {

  // console.log("**************getData************");
  try {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

console.log('profiles accessed')

module.exports = router;