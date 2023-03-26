const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Step 2: Create a schema for the basic info data
const basic_infoSchema = new mongoose.Schema({
  name: String,
  titles: [String],
  social: [
    {
      name: String,
      url: String,
      class: String,
    },
  ],
  image: String,
  description_header: String,
  description: String,
  section_name: {
    profile: String,
    projects: String,
    mystuff: String,
    skills: String,
    experience: String,
  },
});

// Step 3: Use the basic_info.findOne() method to retrieve the data from the database
const basic_info = mongoose.model("basic_info", basic_infoSchema);
router.get("/", async (req, res) => {
  try {
    const basic_info = await basic_info.findOne({});
    res.status(200).json(basic_info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
