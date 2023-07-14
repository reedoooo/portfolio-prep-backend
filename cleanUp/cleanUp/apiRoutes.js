// API ROUTES
const express = require("express");
const router = express.Router();
const MyProfile = require('../../../models/ProfileInfoSchema');
// const TabData = require('../../models/TabDataSchema');


router.get("/myprofile", async (req, res) => {
  console.log('myprofile accessed');

  try {
    const myProfile = await MyProfile.find({});

    res.status(200).json(myProfile); 
    console.log(myProfile[0]); 
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...');
  }
});

// router.get("/tabData", async (req, res) => {
//   console.log('tabData accessed');
//   // console.log("**************getData************");

//   try {
//     const myProfile = await MyProfile.find({});

//     res.status(200).json(myProfile); // Send myProfile directly
//     console.log(myProfile[0]); // Log myProfile directly
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log('try something else...');
//   }
// });


module.exports = router;
