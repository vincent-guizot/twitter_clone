const route = require('express').Router()
const UserRoute = require('./user')
const TweetRoute = require('./tweet')

// route.get('/', (req,res)=>{
//     res.send("HOME")
// })
route.use('/user', UserRoute)
route.use('/tweet', TweetRoute)

module.exports = route