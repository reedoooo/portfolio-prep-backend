const express = require("express");
const router = express.Router();
const TabDataController = require('../../controllers/TabDataController');

router.get("/", TabDataController.getTabs);
router.post("/", TabDataController.createTab);
router.put("/:id", TabDataController.updateTab);
router.delete("/:id", TabDataController.deleteTab);

module.exports = router;
