const MySettingsRoutes = require("../models/SettingsSchema");

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await MySettingsRoutes.find();
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createNewSetting = async (req, res) => {
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
};

exports.updateSetting = async (req, res) => {
  try {
    const { name, color } = req.body;
    const setting = await MySettingsRoutes.findById(req.params.id);
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
};

exports.deleteSetting = async (req, res) => {
  try {
    const setting = await MySettingsRoutes.findById(req.params.id);
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    await setting.remove();
    res.json({ message: "Setting deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
