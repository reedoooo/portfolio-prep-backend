// TCGPlayerRoutes.js
const express = require('express');
const router = express.Router();
const TCGPlayerController = require("../../controllers/TCGPlayerController");

router.post('/api/token', TCGPlayerController.generateToken);

router.get('/api/catalog/categories', TCGPlayerController.getCatalogCategories);

router.post('/api/authorize/authCode', TCGPlayerController.authorizeAuthCode);

module.exports = router;
