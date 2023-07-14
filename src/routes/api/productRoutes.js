const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
    _id: String,
    products: [
      {
        _id: String,
        category: String,
        name: String,
        price: Number,
        inStock: Number,
      }
    ]
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", ProductSchema);

// Routes

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log('req.params.id: ', req.params.id)
  try {
    const product = await Product.findOne({ _id: req.params.id });
    console.log('product: ', product.products)
    if (product === null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Express.js
router.post("/", async (req, res) => {
  const product = new Product(req.body); // req.body should contain the new product data
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { inStock: req.body.inStock },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product === null) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


module.exports = router;
