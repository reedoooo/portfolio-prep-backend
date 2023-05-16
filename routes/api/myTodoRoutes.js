const ToDoData = require("../../models/ToDoDataSchema");
const express = require("express");
const router = express.Router();

console.log("myTodoRoutes accessed");

router.get("/myTodoRoutes", async (req, res) => {
  console.log("myTodoRoutes working");

  try {
    const toDoData = await ToDoData.find({});

    res.status(200).json(toDoData);
    console.log("Data retrieved:", toDoData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error retrieving data:", error);
  }
});

router.post("/myTodoRoutes", async (req, res) => {
  const { name, description, dueDate, status } = req.body;
  const createdAt = new Date();

  const newTodoData = new ToDoData({
    // tasks: [
    // {
    task: {
      name,
      description,
      status: status === "completed" ? true : false,
      dueDate,
      // createdAt,
    },
    // },
    // ],
  });

  try {
    await newTodoData.save();
    res.status(200).json("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

router.put("/myTodoRoutes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, status, dueDate } = req.body;

  try {
    const updatedTab = await ToDoData.findByIdAndUpdate(
      id,
      {
        "task.0.name": name,
        "task.0.description": description,
        "task.0.status": status === "true" ? true : false,
        "task.0.dueDate": dueDate,
      },
      { new: true }
    );

    res.status(200).json(updatedTab);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/myTodoRoutes/:id/:task_id", async (req, res) => {
  const { id, task_id } = req.params;

  try {
    await ToDoData.findByIdAndUpdate(id, {
      $pull: { task: { _id: task_id } }
    });
    res.status(200).json(`Task with id ${task_id} deleted successfully from document with id ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});


module.exports = router;
