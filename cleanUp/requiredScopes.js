const {
    auth,
    requiredScopes
  } = require('express-oauth2-jwt-bearer');
  
  // Initialise the auth middleware with environment variables and restrict
  // access to your api to users with a valid Access Token JWT
  app.use(auth());
  
  // Restrict access to the messages api to users with the `read:msg`
  // AND `write:msg` scopes  
  app.get('/api/messages',
      requiredScopes('read:msg', 'write:msg'),
      (req, res, next) => {
        // ...
      }
  );