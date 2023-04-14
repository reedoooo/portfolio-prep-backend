// routes.js
const express = require("express");
const router = express.Router();
var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn","client_secret":"X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC","audience":"https://reedthamosthuman.onrender.com","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// router.post("/get-token", (req, res) => {
//   const options = {
//     method: "POST",
//     url: "https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token",
//     headers: { "content-type": "application/json" },
//     body:
//       '{"client_id":"pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn","client_secret":"X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC","audience":"https://reedthamosthuman.onrender.com/","grant_type":"client_credentials"}',
//   };

//   request(options, (error, response, body) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred while requesting a token." });
//       return;
//     }

//     res.status(200).json(JSON.parse(body));
//   });
// });

module.exports = router;
