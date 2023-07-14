const express = require("express");
const router = express.Router();
const MySettingsRoutes = require("../../models/SettingsSchema");

// Get all settings
router.get("/mySettingsRoutes", async (req, res) => {
  try {
    const settings = await MySettingsRoutes.find();
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Create a new setting
router.post("/mySettingsRoutes", async (req, res) => {
  try {
    const { name, color } = req.body;
    const newSetting = new MySettingsRoutes({
      settings: { name, color },
    });

    const savedSetting = await newSetting.save();
    res.json(savedSetting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update a setting
router.put("/mySettingsRoutes/:id", async (req, res) => {
  try {
    const { name, color } = req.body;
    const setting = await Settings.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    setting.name = name;
    setting.color = color;
    const updatedSetting = await setting.save();
    res.json(updatedSetting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete a setting
router.delete("/mySettingsRoutes/:id", async (req, res) => {
  try {
    const setting = await Settings.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    await setting.remove();
    res.json({ message: "Setting deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
