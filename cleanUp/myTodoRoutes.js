// const ToDoData = require("../../models/ToDoDataSchema");
// const express = require("express");
// const router = express.Router();

// console.log("myTodoRoutes accessed");

// router.get("/myTodoRoutes", async (req, res) => {
//   console.log("myTodoRoutes working");

//   try {
//     const toDoData = await ToDoData.find({});
//     res.status(200).json(toDoData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//     console.error("Error retrieving data:", error);
//   }
// });

// router.post("/myTodoRoutes", async (req, res) => {
//   console.log(req.body);
//   const { name, description, difficulty, dueDate, status } = req.body;

//   const newTodoData = new ToDoData({
//     task: {
//       name: name,
//       description: description,
//       difficulty: difficulty,
//       dueDate: dueDate,
//       status: status === "completed" || status === true ? true : false,
//     },
//   });

//   try {
//     const savedTask = await newTodoData.save();
//     console.log("savedTask", savedTask);
//     res.status(200).json({ message: "Task added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.put("/myTodoRoutes/:id", async (req, res) => {
//   const { id } = req.params;
//   const { task } = req.body;

//   console.log("myTodoRoutes body", req.body);
//   if (!task) {
//     return res.status(400).send("Task details are required");
//   }

//   const { name, description, difficulty, dueDate, status } = task;

//   if (!name || !description || !dueDate) {
//     return res.status(400).send("All fields are required");
//   }

//   const newTask = {
//     difficulty,
//     description,
//     name,
//     status: status === "completed" || status === true ? true : false,
//     dueDate,
//   };

//   try {
//     const updatedTask = await ToDoData.findByIdAndUpdate(
//       id,
//       { $set: { task: newTask } },
//       { new: true }
//     );

//     res.status(200).json(updatedTask);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating task: " + error.message });
//   }
// });

// router.delete("/myTodoRoutes/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     await ToDoData.findByIdAndDelete(id);
//     res.status(200).json(`Task with id ${id} deleted successfully`);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json("Server error");
//   }
// });

// module.exports = router;
