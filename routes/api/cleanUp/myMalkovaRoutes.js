
const MyMalkovaRoutes = require("../../../models/MalkovaSchema");
const express = require("express");
const router = express.Router();

console.log("myMalkovaRoutes accessed");

router.get('/myMalkovaRoutes', async (req, res) => {
    try {
      // Fetch all URLs from the database
      const myMalkovaRoutes = await MyMalkovaRoutes.find({});
      console.log('myMalkovaRoutes working')
      res.json(myMalkovaRoutes);
    } catch (err) {
      console.error('Error fetching myMalkovaRoutes', err);
      res.status(500).json({ error: 'Failed to fetch myMalkovaRoutes' });
    }
  });


  module.exports = router;
