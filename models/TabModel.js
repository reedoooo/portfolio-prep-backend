const mongoose = require("mongoose");

const { Schema } = mongoose;

const baseInfo = new Schema({
  index: Number,
  size: String,
  title: String,
  linkUrl: String,
  imageUrl: String,
});

const basicInfoSchema = new Schema({
  tab: baseInfo,
});

module.exports = mongoose.model("tab-collections", basicInfoSchema);

