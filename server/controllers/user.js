const { User } = require('../models')

const { tokenGenerator } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class UserController {
    static login(req,res,next){
        let form = req.body
        const errMessage = {
            status : 400,
            message : 'Invalid Email / Pwd'
        }
        User.findOne({
            where : {
                email : form.email
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(form.password, user.password))
                throw errMessage
            return user
        })
        .then(user => {
            const access_token = tokenGenerator(user)
            res.status(200).json({access_token, UserId:user.id})
        })
        .catch(err => {
            next(errMessage)
        })
    }
    
    static register(req,res,next){
        let email = req.body.email
        let errMessage = {
            status: 400,
            message: 'Email has been used!'
        }
        User.findOne({
            where: {
                email : email
            }
        }).then(user=>{
            if(user){
                throw errMessage
            }else{
                let form = req.body
                return User.create({
                    username : form.username,
                    email : form.email,
                    password : form.password,
                    image_url : form.image_url
                })        
            }
        })
        // .then(user => {
        //     res.status(201).json({
        //         id : user.id,
        //         email : user.email,
        //         username : user.username,
        //         image_url: user.image_url
        //     })
        // })
        .then(user => {
            const access_token = tokenGenerator(user)
            res.status(200).json({access_token, UserId:user.id})
        })
        .catch(err => {
            next(err)
        })
    }
    
}

module.exports = UserController

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