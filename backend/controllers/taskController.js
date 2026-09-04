const Task = require("../models/Task")

const createTask = async (req, res) => {

    try{

        const {title, description, status, priority, dueDate} = req.body

        if(!title)
            return res.status(400).json({message: "Title is required"})

        const task = await Task.create({
            
            title,
            description,
            status,
            priority,
            dueDate,
            user: req.user._id

        })

        return res.status(201).json({message: "Task added successfully", task})

    }catch(error){

        res.status(500).json({message: 'Server error', error: error.message})

    }
}

const getTasks = async (req, res) => {

    try{

        const {status, search, page=1, limit=10} = req.query

        const filter = {user: req.user._id}

        if(status && status !== 'all'){

            filter.status = status

        }

        if(search){

            filter.title = {$regex: search, $options: "i"}
        }

        const skip = (Number(page) - 1) * Number(limit)

        const tasks = await Task.find(filter).skip(skip).limit(Number(limit))

        const totalTasks = await Task.countDocuments(filter)

        return res.status(200).json({ 
            tasks, 
            currentPage: Number(page), 
            totalPages:  Math.ceil(totalTasks/ Number(limit)),
            totalTasks
        })


    }catch(error){

        res.status(500).json({message: 'Server error', error: error.message})

    }
}

const updateTask = async (req, res) => {

    try{

        const {id} = req.params

        const task = await Task.findById(id)

        if(!task)
            return res.status(404).json({message: "Task not found"})

        if(task.user.toString() !== req.user._id.toString()){

            return res.status(403).json({message: "Not authorized to update this task"})
        }

    const {title, description, status, priority, dueDate} = req.body
    if(title !== undefined) task.title = title
    if(description !== undefined) task.description = description
    if(status !== undefined) task.status = status
    if(priority !== undefined) task.priority = priority
    if(dueDate !== undefined) task.dueDate = dueDate

    const updatedTask = await task.save()

    return res.status(200).json({message: "Task Updated successfully", task: updatedTask})      


    }catch(error){

        return res.status(500).json({ message: 'Server error', error: error.message })

    }
}

const deleteTask = async (req, res) => {

    try{

        const {id} = req.params
        const task = await Task.findById(id)

        if(!task)
            return res.status(404).json({message: "Task not found"})

        if(task.user.toString() !== req.user._id.toString()){

            return res.status(403).json({message: "Not authorized to delete this task"})

        }

        await task.deleteOne()

        return res.status(200).json({ message: "Task deleted successfully" })


    }catch(error){

        return res.status(500).json({ message: 'Server error', error: error.message })

    }
}

module.exports = {createTask, getTasks, updateTask, deleteTask}