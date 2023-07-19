const express = require('express');
const router = express.Router();
const SettingsController = require('../../controllers/SettingsController');

router.get('/', SettingsController.getAllSettings);
router.post('/', SettingsController.createNewSetting);
router.put('/:id', SettingsController.updateSetting);
router.delete('/:id', SettingsController.deleteSetting);

module.exports = router;
