const TabData = require("../models/TabDataSchema");

exports.getTabs = async (req, res) => {
  try {
    const tabData = await TabData.find({});
    res.status(200).json(tabData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error retrieving data:", error);
  }
};

exports.createTab = async (req, res) => {
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
};

exports.updateTab = async (req, res) => {
  const { id } = req.params;
  const { name, size, color, linkUrl, imgUrl } = req.body;

  try {
    const updatedTab = await TabData.findByIdAndUpdate(
      id,
      {
        tab: { name, size, color, linkUrl, imgUrl },
      },
      { new: true }
    ); 
    res.status(200).json(updatedTab);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

exports.deleteTab = async (req, res) => {
  const { id } = req.params;

  try {
    await TabData.findByIdAndDelete(id);
    res.status(200).json("Data deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};
