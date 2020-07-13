const userRoute = require('express').Router()
const userController = require('../controllers/user')

userRoute.post('/auth/register', userController.register)
userRoute.post('/auth/login', userController.login)

module.exports = userRoute