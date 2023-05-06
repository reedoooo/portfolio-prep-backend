const MyProfile = require('../../models/ProfileInfoSchema');
const express = require('express');
const router = express.Router();
console.log('myProfileRoutes retrieved');

router.get("/myProfileRoutes", async (req, res) => {
  console.log('myProfileRoutes accessed');
  // console.log("**************getData************");

  try {
    const myProfile = await MyProfile.find({});

    res.status(200).json(myProfile); // Send myProfile directly
    console.log(myProfile[0]); // Log myProfile directly
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...');
  }
});

module.exports = router;