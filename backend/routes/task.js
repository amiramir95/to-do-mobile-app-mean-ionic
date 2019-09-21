const express = require('express');

const TaskController = require('../controllers/task');

const router = express.Router();

router.post('', TaskController.createTask);

module.exports = router;
