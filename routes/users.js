const express = require("express");
const router = express.Router();
const axios = require("axios");

const getAccessToken = async () => {
    console.log("getting token")

  try {
    const response = await axios.post(
      `${process.env.ISSUER_BASE_URL}/oauth/token`,
      {
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.SECRET,
        audience: `${process.env.REACT_APP_API_PATH}/api/v2/`,
      }
    );
    
    console.log(response)

    return response.data.access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Error obtaining access token");
  }
};

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});

// router.get("/users", async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const accessToken = await getAccessToken();
//       const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/v2/users`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(response)
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error retrieving user data" });
//     }
//   });

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// router.get("/:userId", async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const response = await axios.get(`https://${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
//         },
//       });
  
//       res.json(response.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error retrieving user data" });
//     }
//   });

//   module.exports = router;
// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/users',
//   params: {q: 'email:"jane@exampleco.com"', search_engine: 'v3'},
//   headers: {authorization: 'Bearer {yourMgmtApiAccessToken}'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });