const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');


const getAllTask = asyncWrapper( async (req, res) => {
  
        const task = await Task.find({});
        res.status(200).json({ task });
 
});

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getTask = async (req, res, next) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID });

        if (!task) {
            return next(createCustomError(`No task with id: ${taskID}`, 404));
            // return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        } else {
            return res.status(404).json({ msg: `${taskID} was deleted successfully` }); 
        }
        
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new:true,runValidators:true
        });
        if (!task) {
            return res.status(404).json({msg: `No task with is ${taskID}`})
        }
        
        res.status(200).json({ task });

    } catch(error) {
          res.status(500).json({ msg: error });
    }
    
};


module.exports = {
    getAllTask,
    deleteTask,
    updateTask,
    getTask,
    createTask
};