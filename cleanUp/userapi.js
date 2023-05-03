const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://reedthamosthuman.onrender.com',
  issuerBaseURL: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.listen(port);

console.log('Running on port ', port);

var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"lItMaSKBSOuFVY3xEbBjjys4HMyHDfwn","client_secret":"Hz1DmVhwQtrrfRXXCeLZgqU5lVytHg7Aq35s3L8mTaguwV-ejNwS1XrtlQbi9s5f","audience":"https://reedthamosthuman.onrender.com","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
    client_secret: '{yourClientSecret}',
    audience: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});