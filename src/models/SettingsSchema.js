const mongoose = require('mongoose');

const { Schema } = mongoose;

console.log('settings schema accessed');

const baseInfo = new Schema({
  name: String,
  color: String,
});

const SettingsSchema = new Schema({
  settings: baseInfo,
});

module.exports = mongoose.model('MySettingsRoutes', SettingsSchema);
