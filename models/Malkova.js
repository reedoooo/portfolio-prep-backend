const mongoose = require('mongoose');

const MalkovaSchema = new mongoose.Schema({
  MalkovaUrls: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Malkova', MalkovaSchema);
