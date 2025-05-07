const Task = require("../models/Task")

const getAllItems = async (req,res)=>{
    try{
        const task = await Task.find()
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({
            msg: error
        })
    }
}
const createItem = async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch (error){
        res.status(500).json({msg: error})
    }
}

const getSingleItem = async (req,res)=>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOne({_id: taskID})
        if (!task){
            return res.status(404).json({
                msg :"No task with id : ${taskID}"
            })
        }
        res.status(200).json({task})
    }catch(error){
        res.status(500).json({
            msg : error
        })
    }
}

const updateItem = async (req,res)=>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new: true,
            runValidators: true,
        })
        if (!task){
            res.status(404).json({
                msg: "Resource of id ${taskID} not available"
            })
        }
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({
            msg : error
        })
    }
}
const deleteItem = async (req,res)=>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task){
            res.status(404).json({
                msg: "Resource of id ${taskID} not available"
            })
        }
        res.status(201).json({task})
    }catch(error){
        res.status(500).json({
            msg : error
        })
    }
}

module.exports = { getAllItems, createItem, getSingleItem, updateItem, deleteItem}


