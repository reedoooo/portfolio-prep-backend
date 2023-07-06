// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY; // Please use a more secure key in real situations

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
  
//   if (!token) {
//     return res.status(403).send({ message: 'No token provided' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: 'Unauthorized!' });
//     }
    
//     // If there's no error, attach the entire decoded payload to req.authData
//     req.authData = decoded;
//     next();
//   });
// };

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(403).send({ message: 'No token provided' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: 'Unauthorized!' });
//     }
    
//     // If there's no error, move to the next middleware or route handler
//     req.userId = decoded.id;
//     next();
//   });
// };

// module.exports = verifyToken; // Don't forget to export the function
