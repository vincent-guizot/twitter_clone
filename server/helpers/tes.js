const ToDoRoute = require('express').Router()
const ToDoController = require('../controllers/todos')

ToDoRoute.get('/', ToDoController.list)
ToDoRoute.get('/:id', ToDoController.find)
ToDoRoute.post('/', ToDoController.addTodo)
ToDoRoute.put('/:id', ToDoController.updateTodo)
ToDoRoute.delete('/:id', ToDoController.deleteTodo)


module.exports = ToDoRoute