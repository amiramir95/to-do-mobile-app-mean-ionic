const express = require('express');

const TaskController = require('../controllers/task');

const router = express.Router();

router.post('', TaskController.createTask);

router.get('/byUser/:userId', TaskController.getTaskByUserId);

router.get('/:taskId', TaskController.getTask);

router.put('/:taskId', TaskController.updateTask);

router.delete('/:taskId', TaskController.deleteTask);

module.exports = router;
