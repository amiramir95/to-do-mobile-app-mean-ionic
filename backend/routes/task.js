const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const TaskController = require('../controllers/task');


router.post('', auth, TaskController.createTask);

router.get('/byUser/:userId', auth, TaskController.getTaskByUserId);

router.get('/:taskId', auth, TaskController.getTask);


router.delete('/:taskId', auth, TaskController.deleteTask);
router.put('/:taskId', auth, TaskController.updateTask);
module.exports = router;
