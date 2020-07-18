const userRoute = require('express').Router()
const userController = require('../controllers/user')

userRoute.post('/auth/register', userController.register)
userRoute.post('/auth/login', userController.login)
userRoute.post('/auth/loginGoogle', userController.loginGoogle)
userRoute.get('/getUsers', userController.getUsers)

module.exports = userRoute