const express = require('express');

const TaskController = require('../controllers/task');

const router = express.Router();

router.post('', TaskController.createTask);

router.get('/:userId', TaskController.getTaskByUserId);

router.get('/:id', TaskController.getTask);

router.put('/:id', TaskController.updateTask);

module.exports = router;
