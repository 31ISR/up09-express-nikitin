const express = require('express')

const router = express.Router()

let tasks = [
    {
        id: 1, title: "дз", done:false
    },
    {
        id: 2, title: "vzorvis", done:true
    }

]

router.get('/', (req,res) => {
    const task = tasks.find(el => el.id == req.params.id)

    if (!task) return res.status(404).json({"message": `Задача с id ${req.params.id} не найдена`})

    res.json(task)
})
router.post('/', (req, res) =>{
    const {title} = req.body

    const task = {
        id: new Date.now(),
        title: title.trim(),
        done: false
    }
    task.push(task)

    res.status(201).json(task)
})

router.delete("/:id", (req, res) =>{
    const task = task.find(el => el.id == req.params.id)

    if (!task) return res.status(404).json({"message": `Задача с id ${req.params.id} не найдена`})

    task = task.filter(el => el.id != req.params.id)

    res.status(204).end()
})

router.patch ("/:id", (req, res) => {
    const task = tasks.findIndex(el => el.id == req.params.id)

    if (!task) return res.status(404).json({"message": `Задача с id ${req.params.id} не найдена`})
    
    task[task] = {...task[task], ...req.body}

    res.json(task[task])
})

module.exports = router