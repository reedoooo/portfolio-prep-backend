// API ROUTES
const express = require("express");
const router = express.Router();
// const { checkJwt } = require('./auth0');

// const MyProfile = require("./api/myprofile"); // Import your Profile model here
// const Profile = require("../models/ProfileModel"); // Import your Profile model here
// const Profiles = require("../models/UserProfileModel"); // Import your Profile model here
// const Tab = require("../models/TabModel");
// const Malkova = require("../models/Malkova"); // Import your Profile model here
 // Import your Tab model here
 console.log('API ROUTES accessed')



// router.get('/home', checkJwt, (req, res) => {
//   res.render('home', {
//     isAuthenticated: true,
//   });
// });

// router.get("/api/myprofile", async (req, res) => {
//   console.log('myprofile accessed')
//   // console.log("**************getData************");
// router.get("/api/myprofile", async (req, res) => {
//   console.log('myprofile accessed')
//   // console.log("**************getData************");

//   try {
//     const profileData = await Profile.findById({ _id: '6421488b773d5b18c1fa0bf3' });
//     res.status(200).json(profileData.data);
//     console.log(profileData.data)
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log('try something else...')
//   }
// });
//   try {
//     const profileData = await Profile.findById({ _id: '6421488b773d5b18c1fa0bf3' });
//     res.status(200).json(profileData.data);
//     console.log(profileData.data)
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log('try something else...')
//   }
// });
// Personal Route for Profile Api
// router.get("/", async (req, res) => {
//   console.log('personal accessed')
//   try {
//     const profile = await Profile.find();
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.use("/api/myprofile", MyProfile);

// Personal Route for Profile Api
// router.get("/api/myprofile", async (req, res) => {
//   console.log('personal accessed')
//   try {
//     const profile = await Profile.find();
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Personal Route for Profile Api
// router.get("/myprofile", async (req, res) => {
//   console.log('personal accessed')
//   try {
//     const profile = await Profile.find();
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route for creating new blog posts
// router.post('protected-route/api/tabs', verifyUser, (req, res) => {
//   // Only authenticated users will be able to access this route
//   // ...
// });




// // GET request to fetch all tabs
// router.get("/tabs", async (req, res) => {
//   console.log('fetching all tabs')

//   try {
//     const tabs = await Tab.findOne();
//     res.json(tabs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET request to fetch all Malkova
// router.get("/malkova", async (req, res) => {
//   console.log('fetching all tabs')

//   try {
//     const malkova = await Malkova.find();
//     res.json(tabs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// PUT request to update a tab by ID
// router.put("/tabs/:id", async (req, res) => {
//   console.log('updating a tab')

//   try {
//     const { id } = req.params;
//     const { title } = req.body;
//     const tab = await Tab.findByIdAndUpdate(id, { title }, { new: true });
//     res.json(tab);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE request to delete a tab by ID
// router.delete("/tabs/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Tab.findByIdAndDelete(id);
//     res.json({ message: "Tab deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// -------------------------------

// User/General Route for Profiles Api
// router.get("/profile", async (req, res) => {
//   console.log('profile accessed')

//     try {
//       const profiles = await Profiles.find();
//       res.json(profiles);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   var request = require("request");

// var options = { 
//   method: 'POST',
//   url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
//   headers: { 'content-type': 'application/json' },
//   body: '{"client_id":"pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn","client_secret":"X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC","audience":"https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// // Route to create a new user
// router.post("/users", async (req, res) => {
//   console.log('users accessed')

//     try {
//       const newUser = new Profiles({
//         email: req.body.email,
//         password: req.body.password,
//       });
//       await newUser.save();
//       res.status(201).json(newUser);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

// // Route to delete a user by ID
// router.delete("/users/:id", async (req, res) => {
//     try {
//       const user = await Profiles.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       await user.remove();
//       res.status(200).json({ message: "User deleted" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

module.exports = router;
