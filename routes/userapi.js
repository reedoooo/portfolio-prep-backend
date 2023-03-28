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
  body: '{"client_id":"LhFH6FSCiRvw9pP4ayyaTanpxwUeomac","client_secret":"-TX8qoFE3yTzbCBcaT3NPaVQb17sHv9pmONVLDlIg1Nk_hp69eqUC8WVRV1V8kn3","audience":"https://reedthamosthuman.onrender.com","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});