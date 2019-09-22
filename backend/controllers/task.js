const Task = require("../models/task");

exports.createTask = (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    state: req.body.state,
    dueDate: req.body.dueDate,
    listId: req.body.listId,
    userId: req.body.userId
  });
  task
    .save()
    .then(createdTask => {
      res.status(201).json({
        message: "Task added successfully",
        createdTask: createdTask._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Task Creation Failed"
      });
    });
};

exports.getTasks = (req, res, next) => {
  Task.find()
    .then(documents => {
      res.status(200).json({
        message: "Task fetched successfully!",
        tasks: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Task Failed !"
      });
    });
};

exports.getTaskByUserId = (req, res, next) => {
  Task.find({
    userId: req.params.userId
  })
    .then(documents => {
      res.status(200).json({
        tasks: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Task Failed !"
      });
    });
};
exports.getTask = (req, res, next) => {
  Task.findById(req.params.taskId)
    .then(document => {
      if (
        JSON.stringify(document.userId) === JSON.stringify(req.params.userId)
      ) {
        res.status(200).json({
          task: document
        });
      } else if (document.userId !== JSON.stringify(req.params.userId)) {
        res.status(401).json({
          message: "Unauthorized, this is not your task"
        });
      } else {
        res.status(404).json({ message: "Task not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching task failed!"
      });
    });
};

exports.updateTask = (req, res, next) => {
  console.log(req.body);
  const task = new Task({
    _id: req.params.taskId,
    title: req.body.title,
    state: req.body.state,
    list: req.body.list,
    createdAt: req.body.createdAt,
    dueDate: req.body.dueDate
  });
  Task.updateOne({ _id: req.params.taskId }, task)
    .then(result => {
      res.status(200).json({ message: "Task Updated successful!" });
    })
    .catch(error => {
      res.status(500).json({
        message: "Task Update Failed"
      });
    });
};

exports.deleteTask = (req, res, next) => {
  Task.deleteOne({ _id: req.params.taskId })
    .then(() => {
      res.status(200).json({
        message: "Task deleted!"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Task Deletion failed!"
      });
    });
};

exports.deleteTaskByListIdAndUserId = (req, res, next) => {
  Task.deleteMany({ listId: req.params.listId, userId: req.params.userId })
    .then(() => {
      res.status(200).json({
        message: "Tasks for list" + req.params.listId + "and user" + req.params.userId + " were deleted!"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed deletion : Tasks for list" +req.params.listId + "and user" + req.params.userId
      });
    });
};
