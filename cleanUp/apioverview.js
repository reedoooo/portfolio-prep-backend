//-----------------------------------GET ACCESS TOKENS-----------------------------------//

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

//-----------------------------------USE ACCESS TOKENS-----------------------------------//

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/clients',
  headers: {'content-type': 'application/json', authorization: 'Bearer {yourAccessToken}'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

//-----------------------------------GET REFRESH TOKENS-----------------------------------//

var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
    client_secret: '{yourClientSecret}',
    code: '{yourAuthorizationCode}',
    redirect_uri: 'http://localhost:3000/callback'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

//-----------------------------------USE REFRESH TOKENS (basic authentication)-----------------------------------//

var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    authorization: 'Basic {yourApplicationCredentials}'
  },
  data: new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
    refresh_token: '{yourRefreshToken}'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

//-----------------------------------USE REFRESH TOKENS (post authentication)-----------------------------------//

var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: 'pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn',
    client_secret: '{yourClientSecret}',
    refresh_token: '{yourRefreshToken}'
  })
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});