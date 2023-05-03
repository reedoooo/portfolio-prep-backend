const Profile = require('../../models/ProfileModel');
const express = require('express');
const router = express.Router();
console.log('myprofile retrieved')

router.get("/myprofile", async (req, res) => {
  console.log('myprofile accessed')
  // console.log("**************getData************");

  try {
    const myProfile = await Profile.find({});
    res.status(200).json(myProfile.data);
    console.log(myProfile.data)
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...')
  }
});
module.exports = router;

// router.get('/myprofile', async (req, res) => {
  
//   try {
//     const profileData = await Profile.find({});
//     res.json(profileData);  } catch (err) {
//     console.error(err);
//   }
// }
// )

// module.exports = router;
// router.get('/myprofile', async (req, res) => {
//   const userId = req.user.sub; // assuming you're using Auth0 to authenticate the user
//   const profile = await Profile.findOne({ userId });
//   res.json(profile);
// });

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const conn = mongoose.createConnection('mongodb+srv://reedthahuman:Olivervogt1@clusterthahuman.drldbfy.mongodb.net/human-database?retryWrites=true&w=majority');

// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
// });

// const Profile = require("../../models/UserProfileModel");

// router.get('/myprofile', async (req, res) => {
//   const userId = req.user.sub; // assuming you're using Auth0 to authenticate the user
//   const profile = await Profile.findOne({ userId });

//   // retrieve the profileData file
//   gfs.files.findOne({ _id: profile.profileDataId }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: 'file not found' });
//     }
//     const readstream = gfs.createReadStream(file.filename);
//     let buffer = '';
//     readstream.on('data', (chunk) => {
//       buffer += chunk;
//     });
//     readstream.on('end', () => {
//       res.json({ ...profile.toObject(), profileData: buffer });
//     });
//   });
// });

// module.exports = router;

// const express = require("express");
// // const Profile = require("../../models/ProfileModel");
// const router = express.Router();

// console.log('myprofile accessed')
// const Profile = require('../models/Profile');
// // const Profile = require("../../models/ProfileModel");

// const { GridFSBucket } = require('mongodb');

// router.get('/myprofile', async (req, res) => {
//   const userId = req.user.sub; // assuming you're using Auth0 to authenticate the user
//   const profile = await Profile.findOne({ userId });

//   // retrieve the profileData file
//   const bucket = new GridFSBucket(mongoose.connection.db);
//   const file = await bucket.findOne({ _id: profile.profileDataId });
//   const stream = bucket.openDownloadStream(file._id);
//   const buffer = await new Promise((resolve, reject) => {
//     const chunks = [];
//     stream.on('data', chunk => chunks.push(chunk));
//     stream.on('error', reject);
//     stream.on('end', () => resolve(Buffer.concat(chunks)));
//   });

//   res.json({ ...profile.toObject(), profileData: buffer.toString() });
// });

// Step 3: Use the basic_info.findOne() method to retrieve the data from the database

// router.get("/api/myprofile", async (req, res) => {
//   console.log('personal accessed')
//   try {
//     const profile = await Profile.find();
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.get('/myprofile', async (req, res) => {
//   const userId = req.user.sub; // assuming you're using Auth0 to authenticate the user
//   const profile = await Profile.findOne({ userId });
//   res.json(profile);
// });

// router.get("/api/myprofile", async (req, res) => {
//   console.log('myprofile retreived')
//   // console.log("**************getData************");

//   try {
//     const profileData = await Profile.find({});
//     res.status(200).json(profileData);
//     console.log(profileData)
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log('try something else...')
//   }
// });

