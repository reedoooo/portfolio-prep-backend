const mongoose = require('mongoose');
const { Schema } = mongoose;

console.log('tab data schema accessed');

const baseInfo = new Schema({
  title: String,
  notes: String,
});

const NotesSchema = new Schema({
  contents: [baseInfo], // Array of baseInfo
});

module.exports = mongoose.model('MyNotesRoutes', NotesSchema);
