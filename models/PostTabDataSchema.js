const mongoose = require("mongoose");

const { Schema } = mongoose;

console.log('tab data schema accessed')

const baseInfo = new Schema({
  index: Number,
  size: String,
  title: String,
  linkUrl: String,
  imageUrl: String,
});

const TabDataSchema = new Schema({
  tab: baseInfo,
});

module.exports = mongoose.model("savedtabs", TabDataSchema);
