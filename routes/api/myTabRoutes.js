const TabData = require("../../models/TabDataSchema");
const express = require("express");
const router = express.Router();

console.log("myTabRoutes accessed");

router.get("/myTabRoutes", async (req, res) => {
  console.log("myTabRoutes gotten");

  try {
    const tabData = await TabData.find({});

    res.status(200).json(tabData);
    // console.log("Data retrieved:", tabData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error retrieving data:", error);
  }
});

router.post("/myTabRoutes", async (req, res) => {
  console.log("myTabRoutes posted");

  const { name, size, color, linkUrl, imgUrl } = req.body;

  const newTabData = new TabData({
    tab: { name, size, color, linkUrl, imgUrl },
  });

  try {
    await newTabData.save();
    res.status(200).json("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

router.put("/myTabRoutes/:id", async (req, res) => {
  console.log("myTabRoutes putted");
  const { id } = req.params;
  const { name, size, color, linkUrl, imgUrl } = req.body;

  try {
    const updatedTab = await TabData.findByIdAndUpdate(id, {
      tab: { name, size, color, linkUrl, imgUrl },
    }, { new: true }); // <-- Here's where you add the option
    res.status(200).json(updatedTab); 
    console.log("updatedTab:", updatedTab);
    // Now this will be the updated document
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});



router.delete("/myTabRoutes/:id", async (req, res) => {
  console.log("myTabRoutes deleteded");

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
