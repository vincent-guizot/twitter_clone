const { Tweet,User,Like,Comment } = require('../models')

class TweetController {
    static list(req,res){
        //Menerima dr middleware
        Tweet.findAll()
        .then(Tweet => {
            res.status(200).json(Tweet)
        })
        .catch(err => {
            next(err)
        })
    }
    static allList(req,res,next){
        //Menerima dr middleware
        Tweet.findAll({
            include : [
                User,
                Like,
                Comment
            ],
            attributes: {
                exclude: 
                    ['User.password']
                
            }
        })
        .then(Tweet => {
            res.status(200).json(Tweet)
        })
        .catch(err => {
            next(err)
        })
    }
    static add(req,res,next){
        let form = req.body
        let userId = req.userData.id
        
        Tweet.create({
            tweet : form.tweet,
            tags : form.tags,
            media : form.media,
            UserId : userId
        })
        .then(Tweet => {
            res.status(201).json(Tweet)
        })
        .catch(err => {
            next(err)
        })
    }
    static update(req,res,next){
        let getId = req.params.id
        let form = req.body
        Tweet.update({
            tweet : form.tweet,
            tags : form.tags,
            media : '',
        },{
            where : {
                id : getId
            }
        })
        .then(Tweet => {
             if(!Tweet ){
                next({
                    name : "Not_Found"
                })
            }else{
                res.status(200).json(Tweet)
            }
            res.status(201).json(Tweet)
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req,res,next){
        let getId =  req.params.id
        Tweet.destroy({
            where : {
                id : getId
            }
        })
        .then(Tweet =>{
             if(!Tweet ){
                next({
                    name : "Not_Found"
                })
            }else{
                res.status(200).json(Tweet)
            }
            res.status(200).json(Tweet)   
        })
        .catch(err =>{
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