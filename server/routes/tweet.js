const Route = require('express').Router()
const TweetController = require('../controllers/Tweet')

const { authentication, authorization } = require('../middlewares/auth')

Route.get('/all',  TweetController.allList)
// Route.get('/', authentication ,TweetController.list)
// Route.get('/:id', authentication ,TweetController.find)
Route.post('/', authentication ,TweetController.add)
Route.put('/:id', authentication, authorization, TweetController.update)
Route.delete('/:id', authentication, authorization, TweetController.delete)


module.exports = Route