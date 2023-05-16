// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// console.log('tab data schema accessed');

// const baseInfoSchema = new Schema({
//   index: { type: Number, required: true },
//   size: { type: String, required: true },
//   title: { type: String, required: true },
//   linkUrl: { type: String, required: true },
//   imageUrl: { type: String, required: true },
// });

// const TabDataSchema = new Schema({
//   tab: { type: baseInfoSchema, required: true },
// });

// module.exports = mongoose.model("savedtabs", TabDataSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

console.log('tab data schema accessed')

const baseInfo = new Schema({
  name: String,
  size: String,
  color: String,
  linkUrl: String,
  imgUrl: String,
});

const TabDataSchema = new Schema({
  tab: baseInfo,
});

module.exports = mongoose.model("mysavedtabs", TabDataSchema);

