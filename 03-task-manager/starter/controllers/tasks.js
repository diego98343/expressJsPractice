const Task = require('../models/task')


const getAllTask = (req, res) => {
    res.send('all items from controller file');
}

const createTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
}

const getTask =(req,res) =>{
    res.send('get task');
}

const updateTask =(req,res) =>{
    res.send('update task');
}

const deleteTask =(req,res) =>{
    res.send('delete task');
}


module.exports = {
    getAllTask,deleteTask,updateTask,getTask,createTask
}