const express = require('express');
const router = express.Router();
const {getAllTask,
       createTask,
       deleteTask,
       updateTask}= require('../controllers/tasks')

router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getAllTask).patch(updateTask).delete(deleteTask);


module.exports = router;