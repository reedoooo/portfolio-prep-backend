// const mongoose = require("mongoose");

// const { Schema } = mongoose;
// const mongoose = require("mongoose");

// const { Schema } = mongoose;

// console.log('todo data schema accessed')

// const baseInfo = new Schema({
//   index: Number,
//   size: String,
//   name: String,
//   color: String,
//   linkUrl: String,
//   imgUrl: String,
// });

// const ToDoDataSchema = new Schema({
//   tab: baseInfo,
// });

// module.exports = mongoose.model("savednotes", ToDoDataSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
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
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const ToDoDataSchema = new Schema({
    tasks: [taskSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  

module.exports = mongoose.model("saveditems", ToDoDataSchema);
