const express = require("express");
const Profile = require("../models/ProfileModel");
const router = express.Router();

console.log('profile accessed')
// Step 3: Use the basic_info.findOne() method to retrieve the data from the database
router.get('/', async (req, res) => {

  // console.log("**************getData************");

  try {
    const profileData = await Profile.find({});
    res.status(200).json(profileData);
    console.log(profileData)
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...')
  }
});



module.exports = router;
