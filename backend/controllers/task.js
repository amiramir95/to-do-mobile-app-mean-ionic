const Task = require('../models/task');

exports.createTask = (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    state: req.body.state
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: 'Task added successfully',
      createdTask: createdTask._id
    });
  });
};
