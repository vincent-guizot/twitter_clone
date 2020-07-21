const Route = require('express').Router()
const TweetController = require('../controllers/Tweet')

const { authentication, authorization } = require('../middlewares/auth')

// Tweet
Route.get('/all',  TweetController.allList)
Route.post('/', authentication ,TweetController.add)
Route.put('/:id', authentication, authorization, TweetController.update)
Route.delete('/:id', authentication, authorization, TweetController.delete)

// Like
Route.post('/like', authentication, TweetController.likeTweet)
Route.post('/unlike', authentication, TweetController.unlikeTweet)

//Comment
Route.post('/comment', authentication, TweetController.createComment)
Route.put('/comment/:id', authentication, TweetController.updateComment)
Route.delete('/comment/:id', authentication, TweetController.deleteComment)

module.exports = Route