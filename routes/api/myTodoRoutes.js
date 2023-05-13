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
    const { description, dueDate, status } = req.body;
    const createdAt = new Date();
  
    const newTodoData = new ToDoData({
      tasks: [{
        description,
        status: status === 'completed' ? true : false,
        dueDate,
        createdAt
      }]
    });
  
    try {
      await newTodoData.save();
      res.status(200).json("Data added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  });
  

// router.delete("/myTodoRoutes/:id", async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         await ToDoData.findByIdAndDelete(id);
//         res.status(200).json("Data deleted successfully");
//     } catch (error) {
//         console.error(error);
//         res.status(500).json("Server error");
//     }
// });

module.exports = router;
