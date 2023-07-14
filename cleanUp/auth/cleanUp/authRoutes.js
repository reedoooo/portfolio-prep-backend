const express = require('express');
// const { auth } = require('express-openid-connect');
const verifyUser = require('./authorize.js');
const User = require('../../models/UserSchema');

const router = express.Router();

router.use(verifyUser);

router.get('/myProfileRoutes', async (req, res) => {
  try {
    console.log('myProfileRoutes accessed');
    const user = await User.findOne({ userId: req.user.sub });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


module.exports = router;

// console.log('Auth0 Config:', process.env.AUTH0_CLIENT_ID, process.env.AUTH0_ISSUER_BASE_URL, process.env.AUTH0_SECRET);

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com',
//   clientID: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
//   baseURL: 'http://localhost:3000',
//   secret: '2e259de0b8101c05e0f0c2cb69a31046cbbbb3ef910ee1f0b737d8e2f58ab09f',
//   routes: {
//     callback: '/callback'
//   }
// };

// for (const key in config) {
//   if (config.hasOwnProperty(key)) {
//     console.log(`${key}: ${config[key]}`);
//   }
// }

// router.use(auth(config));



// router.get("/myprofile", async (req, res) => {
//   console.log('myprofile accessed');
//   // console.log("**************getData************");

//   try {
//     const myProfile = await MyProfile.findById('6421488b773d5b18c1fa0bf3');

//     res.status(200).json(myProfile); // Send myProfile directly
//     console.log(myProfile[0]); // Log myProfile directly
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log('try something else...');
//   }
// });


