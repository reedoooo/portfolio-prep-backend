const express = require('express');
const router = express.Router();

console.log('loginapi accessed')

router.post('/api/login', (req, res) => {
    // Get the data from the request body
    const data = req.body;
    
    // Authenticate the user with Auth0
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.AUTH0_SECRET);
  
    // Save the data to the MongoDB database
    const collection = db.collection('data');
    collection.insertOne({ data, user: decoded.sub }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error saving data to database');
      } else {
        res.status(200).send('Data saved successfully');
      }
    });
  });
  
  module.exports = router;
