const express = require("express");
const router = express.Router();
const ProfileController = require('../../controllers/ProfileController');

console.log("myprofile retrieved");

router.get("/", ProfileController.getProfile);

module.exports = router;
