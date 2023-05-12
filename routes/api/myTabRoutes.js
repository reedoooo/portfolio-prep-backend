const TabData = require('../../models/TabDataSchema');
const express = require('express');
const router = express.Router();

console.log('myTabRoutes accessed');

router.get("/myTabRoutes", async (req, res) => {
  console.log('myTabRoutes working');

  try {
    const tabData = await TabData.find({});

    res.status(200).json(tabData);
    console.log('data retrieved');
    console.log(tabData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('try something else...');
  }
});

module.exports = router;
