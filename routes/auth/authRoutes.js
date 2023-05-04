const express = require('express');
const { auth } = require('express-openid-connect');
const axios = require('axios');
const verifyUser = require('../auth/authorize');

const router = express.Router();

router.use(verifyUser);

console.log('Auth0 Config:', process.env.AUTH0_CLIENT_ID, process.env.AUTH0_ISSUER_BASE_URL, process.env.AUTH0_SECRET);

const config = {
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com',
  clientID: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
  baseURL: 'http://localhost:3000',
  secret: '2e259de0b8101c05e0f0c2cb69a31046cbbbb3ef910ee1f0b737d8e2f58ab09f',
  routes: {
    callback: '/callback'
  }
};

for (const key in config) {
  if (config.hasOwnProperty(key)) {
    console.log(`${key}: ${config[key]}`);
  }
}

router.use(auth(config));

router.get('/', async (req, res) => {  // adding 'async' here
  try {
    const optionsForAuth = {
      method: "POST",
      url: "https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      data: {
        "client_id": process.env.REACT_APP_AUTH0_CLIENT_ID,
        "client_secret": process.env.REACT_APP_CLIENT_SECRET,
        "audience": process.env.REACT_APP_API_SERVER_URL,
        "grant_type": process.env.CLIENT_CREDENTIALS
      },
    };

    const authResponse = await axios(optionsForAuth);  // 'await' is now within an async function
    console.log(authResponse.data);

    // your logic here...

  } catch (error) {
    console.error('Error fetching authentication response:', error);
    res.status(500).send("Server Error");
  }
});

// You might not need to call this function here. Depending on where and how you're using this router module.
// async function main() {
//   await getAuthResponse();
// }
// main();

module.exports = router;
