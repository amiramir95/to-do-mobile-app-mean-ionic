const Task = require('../models/task');

exports.createTask = (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    state: req.body.state,
    dueDate: req.body.dueDate
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: 'Task added successfully',
      createdTask: createdTask._id
    });
  });
};

exports.getTasks = (req, res, next) => {
  Task.find().then(documents => {
    res.status(200).json({
      message: 'Task fetched successfully!',
      tasks: documents
    });
  });
};

exports.getTask = (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: 'Task not found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching task failed!'
      });
    });
};

exports.updateTask = (req, res, next) => {
  const task = new Task({
    _id: req.body.id,
    title: req.body.title,
    state: req.body.state,
    list: req.body.list,
    createdAt: req.body.createdAt,
    dueDate: req.body.dueDate
  });
  Task.updateOne({ _id: req.params.id }, task).then(result => {
    res.status(200).json({ message: 'Task Updated successful!' });
  });
};
