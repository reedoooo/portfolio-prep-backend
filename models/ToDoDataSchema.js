const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: false,
  }
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const ToDoDataSchema = new Schema({
  task: [taskSchema],
});


module.exports = mongoose.model("currentasks", ToDoDataSchema);
