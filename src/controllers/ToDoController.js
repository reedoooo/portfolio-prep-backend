const ToDoData = require('../models/ToDoDataSchema');

exports.getAllTasks = async (req, res) => {
  try {
    const toDoData = await ToDoData.find({});
    res.status(200).json(toDoData);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Error retrieving data:', error);
  }
};

exports.createTask = async (req, res) => {
  const { name, description, difficulty, dueDate, status } = req.body;

  const newTodoData = new ToDoData({
    task: {
      name: name,
      description: description,
      difficulty: difficulty,
      dueDate: dueDate,
      status: status === 'completed' || status === true ? true : false,
    },
  });

  try {
    const savedTask = await newTodoData.save();
    res.status(200).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task) {
    return res.status(400).send('Task details are required');
  }

  const { name, description, difficulty, dueDate, status } = task;

  if (!name || !description || !dueDate) {
    return res.status(400).send('All fields are required');
  }

  const newTask = {
    difficulty,
    description,
    name,
    status: status === 'completed' || status === true ? true : false,
    dueDate,
  };

  try {
    const updatedTask = await ToDoData.findByIdAndUpdate(
      id,
      { $set: { task: newTask } },
      { new: true },
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task: ' + error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await ToDoData.findByIdAndDelete(id);
    res.status(200).json(`Task with id ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
};
