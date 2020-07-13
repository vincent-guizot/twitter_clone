const { Tweet, User, Like, Comment } = require('../models')

class TweetController {
    static list(req, res) {
        //Menerima dr middleware
        Tweet.findAll()
            .then(Tweet => {
                res.status(200).json(Tweet)
            })
            .catch(err => {
                next(err)
            })
    }
    static allList(req, res, next) {
        //Menerima dr middleware
        Tweet.findAll({
            include: [
                { model: User, attributes: { exclude: ['password','createdAt','updatedAt'] } },
                { model: Like, attributes: ['id','TweetId', 'UserId'] },
                { model: Comment, attributes: ['id','TweetId', 'UserId', 'reply'] },
            ],

        })
            .then(Tweet => {
                res.status(200).json(Tweet)
            })
            .catch(err => {
                next(err)
            })
    }
    static add(req, res, next) {
        let form = req.body
        let userId = req.userData.id
        // console.log(typeof new Array(form.tags))

        Tweet.create({
            tweet: form.tweet,
            tags: form.tags,
            media: form.media,
            UserId: userId
        })
            .then(Tweet => {
                res.status(201).json(Tweet)
            })
            .catch(err => {
                next(err)
            })
    }
    static update(req, res, next) {
        let getId = req.params.id
        let form = req.body
        Tweet.update({
            tweet: form.tweet,
            tags: form.tags,
            media: form.media,
        }, {
            where: {
                id: getId
            }
        })
            .then(Tweet => {
                if (!Tweet) {
                    next({
                        name: "Not_Found"
                    })
                } else {
                    res.status(200).json(Tweet)
                }
                res.status(201).json(Tweet)
            })
            .catch(err => {
                next(err)
            })
    }
    static delete(req, res, next) {
        let tweetId = req.params.id
        let UserId = req.userData.id

        Tweet.destroy({
            where: {
                id: tweetId
            }
        })
            .then(Tweet => {
                if (!Tweet) {
                    next({
                        name: "Not_Found"
                    })
                } else {
                    return Like.destroy({
                        where : {
                            TweetId : tweetId,
                            UserId
                        }
                    })
                }
            })
            .then(tweet=>{
                return Comment.destroy({
                    where : {
                        TweetId : tweetId,
                        UserId
                    }
                })
            })
            .then(tweet=>{
                    res.status(200).json(tweet)

            })
            .catch(err => {
                next(err)
            })
    }

    static likeTweet(req, res, next) {
        let tweetId = req.body.TweetId
        let userId = req.userData.id

        Like.findOrCreate({
            where: {
                TweetId: tweetId,
                UserId: userId
            }
        })
            .then(Like => {
                console.log(Like)
                res.status(200).json({
                    statusLike: Like[1]
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static unlikeTweet(req, res, next) {
        let tweetId = req.body.TweetId
        let userId = req.userData.id

        Like.findOne({
            where: {
                TweetId: tweetId,
                UserId: userId
            }
        })
            .then(like => {
                return Like.destroy({
                    where: {
                        id: like.id
                    }
                })
            })
            .then(like => {
                res.status(200).json(like)
            })
            .catch(err => {
                next(err)
            })
    }

    static createComment(req, res, next) {
        let { TweetId, reply } = req.body
        let UserId = req.userData.id

        Comment.create({
            TweetId,
            reply,
            UserId
        })
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(err => {
                next(err)
            })
    }
    static updateComment(req, res, next) {
        let { reply } = req.body
        let id = req.params.id
        let UserId = req.userData.id

        Comment.findOne({
            where: {
                id,
                UserId,
            }
        })
            .then(comment => {
                return Comment.update({
                    reply
                }, {
                    where: {
                        id: comment.id
                    }
                })
            })
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(err => {
                next(err)
            })
    }
    static deleteComment(req, res, next) {
        let id = req.params.id
        let UserId = req.userData.id

        Comment.findOne({
            where: {
                UserId,
                id 
            }
        })
            .then(comment => {
                return Comment.destroy({
                    where: {
                        id: comment.id
                    }
                })
            })
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(err => {
                next(err)
            })
    }
}
module.exports = TweetController

/**
 * HTTP Status Code
 * 200 : Ok
 * 201 : Created
 * 400 : Bad Request
 * 401 : Not Authorized
 * 403 : Forbidden
 * 404 : Not Found
 * 500 : Internal Server Error
 *
 */