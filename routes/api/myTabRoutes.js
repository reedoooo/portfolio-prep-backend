const TabData = require('../../models/TabDataSchema');
const express = require('express');
const router = express.Router();

console.log('myTabRoutes accessed');

router.get("/myTabRoutes", async (req, res) => {
  console.log('myTabRoutes working');

  try {
    const tabData = await TabData.find({});

    res.status(200).json(tabData);
    console.log('Data retrieved:', tabData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error retrieving data:', error);
  }
});

router.post('/myTabRoutes', async (req, res) => {
    const { index, size, color, name, linkUrl, imgUrl } = req.body;
  
    const newTabData = new TabData({ tab: { index, size, name, linkUrl, imgUrl } });
  
    try {
      await newTabData.save();
      res.status(200).json('Data added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json('Server error');
    }
});

// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// console.log('tab data schema accessed')

// const baseInfo = new Schema({
//   index: Number,
//   size: String,
//   name: String,
//   linkUrl: String,
//   imgUrl: String,
// });

// const TabDataSchema = new Schema({
//   tab: baseInfo,
// });

// module.exports = mongoose.model("savedtabs", TabDataSchema);


// router.post('/myTabRoutes', async (req, res) => {
//   try {
//     const newData = req.body; // Assuming the request body contains the data to be added

//     const createdData = await TabData.create(newData);
//     res.status(201).json(createdData);
//     console.log('Data created:', createdData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.log('Error creating data:', error);
//   }
// });

// router.post('/myTabRoutes', async (req, res) => {
//     const { index, size, color, name, linkUrl, imgUrl } = req.body;
  
//     const user = new User({ username, email, password });
  
//     try {
//       await user.save();
//       res.status(200).json('User added successfully');
//     } catch (error) {
//       console.error(error);
//       res.status(500).json('Server error');
//     }
//   });

  

module.exports = router;
