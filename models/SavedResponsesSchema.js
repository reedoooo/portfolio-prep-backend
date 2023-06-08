const mongoose = require("mongoose");

const { Schema } = mongoose;

console.log("saved-responses schema accessed");

const baseInfo = new Schema({
  name: String,
});

const SavedResponsesSchema = new Schema({
  responses: baseInfo,
});

module.exports = mongoose.model("SavedResponses", SavedResponsesSchema);
