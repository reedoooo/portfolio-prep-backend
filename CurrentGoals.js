const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Book', goalsSchema);