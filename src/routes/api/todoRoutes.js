// Dependencies
const express = require("express");
const router = express.Router();
const ToDoController = require("../../controllers/ToDoController.js");

router.get("/myTodoRoutes", ToDoController.getAllTasks);

router.post("/myTodoRoutes", ToDoController.createTask);

router.put("/myTodoRoutes/:id", ToDoController.updateTask);

router.delete("/myTodoRoutes/:id", ToDoController.deleteTask);

module.exports = router;
