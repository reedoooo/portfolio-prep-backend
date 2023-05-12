const TabData = require("../../models/TabDataSchema");
const express = require("express");
const router = express.Router();

console.log("myTabRoutes accessed");

router.get("/myTabRoutes", async (req, res) => {
  console.log("myTabRoutes working");

  try {
    const tabData = await TabData.find({});

    res.status(200).json(tabData);
    console.log("Data retrieved:", tabData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error retrieving data:", error);
  }
});

router.post("/myTabRoutes", async (req, res) => {
  const { index, size, color, name, linkUrl, imgUrl } = req.body;

  const newTabData = new TabData({
    tab: { index, size, name, linkUrl, imgUrl },
  });

  try {
    await newTabData.save();
    res.status(200).json("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

router.delete("/myTabRoutes/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await TabData.findByIdAndDelete(id);
        res.status(200).json("Data deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});

module.exports = router;
