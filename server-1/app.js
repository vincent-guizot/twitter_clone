const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 4000
const routes = require('./routes')

//Middleware
const errHandling = require('./middlewares/error')

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use('/', routes)
app.use(errHandling)

app.listen(port, ()=>{
    console.log('This apps is running at port : ', port)
})
module.exports = app
