const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: String
});

const Category = mongoose.model('Category', categorySchema);

router.get('/', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

module.exports = router;
