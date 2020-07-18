const { User } = require('../models')

const { tokenGenerator } = require('../helpers/jwt')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static login(req, res, next) {
        let form = req.body
        const errMessage = {
            status: 400,
            message: 'Invalid Email / Pwd'
        }
        User.findOne({
            where: {
                email: form.email
            }
        })
            .then(user => {
                if (!user || !bcrypt.compareSync(form.password, user.password))
                    throw errMessage
                return user
            })
            .then(user => {
                const access_token = tokenGenerator(user)
                res.status(200).json({ access_token, UserId: user.id, avatar: user.image_url })
            })
            .catch(err => {
                next(errMessage)
            })
    }

    static register(req, res, next) {
        let email = req.body.email
        let errMessage = {
            status: 400,
            message: 'Email has been used!'
        }
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                throw errMessage
            } else {
                let form = req.body
                return User.create({
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    image_url: form.image_url
                })
            }
        })
            .then(user => {
                const access_token = tokenGenerator(user)
                res.status(200).json({ access_token, UserId: user.id, avatar: user.image_url })
            })
            .catch(err => {
                next(err)
            })
    }

    static loginGoogle(req, res, next) {
        let CLIENT_ID = process.env.CLIENT_ID
        let token = req.body.tokenId
        let userName = null
        let userEmail = null
        let userPicture = null
        const client = new OAuth2Client(CLIENT_ID);
        // console.log('client: ', client);

        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })
            .then((ticket) => {
                const payload = ticket.getPayload();
                console.log('payload: ', payload);
                userEmail = payload.email
                userName = payload.name
                userPicture = payload.picture
                console.log('userEmail: ', userEmail);
                return User.findOne({
                    where: {
                        email: userEmail
                    }
                })
            })
            .then((data) => {
                console.log('data: ', data);
                if (data) {
                    console.log('data: ', data);
                    let access_token = tokenGenerator(data)
                    res.status(200).json({
                        access_token,
                        username: data.username
                    })
                    return
                } else {
                    let newUser = {
                        username: userName,
                        email: userEmail,
                        image_url : userPicture,
                        password: "123"
                    }
                    console.log('newUser: ', newUser);
                    return User.create(newUser)
                }
            })
            .then((user) => {
                let access_token = tokenGenerator(user)
                res.status(200).json({
                    access_token,
                    UserId: user.id, 
                    avatar: user.image_url

                })
                // return
            }).catch((err) => {
                next({ name: 'ERROR_SERVER' })
            });
    }

    static getUsers(req, res, nex) {
        User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
            .then((result) => {
                // console.log('result: ', result);
                res.status(200).json(result)
            }).catch((err) => {
                next({ name: 'ERROR_SERVER' })
            });
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