const express = require("express");
const router = express.Router();
const SettingsController = require('../../controllers/SettingsController');

router.get("/mySettingsRoutes", SettingsController.getAllSettings);
router.post("/mySettingsRoutes", SettingsController.createNewSetting);
router.put("/mySettingsRoutes/:id", SettingsController.updateSetting);
router.delete("/mySettingsRoutes/:id", SettingsController.deleteSetting);

module.exports = router;
