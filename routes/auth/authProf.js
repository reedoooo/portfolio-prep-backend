var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-eq6zzpz5vj8o8v17.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"pkjVpsG2T7vvDJ8YVpQ8AGippZ8MAJsn","client_secret":"X11cUZbZdGR7TxzEfSWuVxfbT6TjdoEmJFJfKseEwZdB3FV3GbMOXc75Tl8alwxC","audience":"https://dev-eq6zzpz5vj8o8v17.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});