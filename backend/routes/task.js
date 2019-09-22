const express = require('express');

const TaskController = require('../controllers/task');

const router = express.Router();

router.post('', TaskController.createTask);

router.get('/byUser/:userId', TaskController.getTaskByUserId);

router.get('/:taskId', TaskController.getTask);

router.put('/:id', TaskController.updateTask);

module.exports = router;
