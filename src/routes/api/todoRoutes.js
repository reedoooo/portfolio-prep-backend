// Dependencies
const express = require('express');
const router = express.Router();
const ToDoController = require('../../controllers/ToDoController.js');

router.get('/', ToDoController.getAllTasks);

router.post('/', ToDoController.createTask);

router.put('/:id', ToDoController.updateTask);

router.delete('/:id', ToDoController.deleteTask);

module.exports = router;
