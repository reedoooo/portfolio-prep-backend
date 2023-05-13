// Define a schema for the URLs collection
const mongoose = require("mongoose");
// const { Schema } = mongoose;

const MalkovaSchema = new mongoose.Schema({
  url: String,
});

// Create a model for the URLs collection
// const Url = mongoose.model("Url", urlSchema);

module.exports = mongoose.model("malkovas", MalkovaSchema);

// const taskSchema = new Schema({
//     description: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     status: {
//       type: Boolean,
//       default: false,
//     },
//     dueDate: {
//       type: Date,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   });

//   const MalkovaSchema = new Schema({
//     tasks: [taskSchema],
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   });

// //   module.exports = router;

// module.exports = mongoose.model("malkovas", MalkovaSchema);
