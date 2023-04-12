const router = require("express").Router();
const Profile = require("../models/ProfileModel");

console.log("myprofile accessed");
router.get("/", async (req, res) => {
  try {
    const profileData = await Profile.find({});
    res.status(200).json(profileData);
    console.log(profileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("try something else...");
  }
});

module.exports = router;
