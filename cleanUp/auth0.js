const auth0 = require("auth0-js");

const auth0Config = {
  domain: process.env.REACT_APP_AUTH_DOMAIN
  ,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
  responseType: "token id_token",
  scope: "openid profile email",
};

const webAuth = new auth0.WebAuth(auth0Config);

const login = () => {
  webAuth.authorize();
};
REACT_APP_AUTH_DOMAIN
const handleAuthentication = () => {
  return new Promise((resolve, reject) => {
    webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        resolve(authResult);
      } else if (err) {
        reject(err);
      }
    });
  });
};

module.exports = {
  login,
  handleAuthentication,
};
