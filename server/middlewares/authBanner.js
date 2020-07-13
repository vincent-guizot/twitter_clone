const { Banner } = require('../models')

const jwt = require('jsonwebtoken')
const secretKey = 'bebas'


//Middleware functions
const authentication = (req, res, next) => {
    console.log("Authentication checked!")
    const { access_token } = req.headers
    if (!access_token) {
        res.status(404).json({
            message: "Token not found!"
        })
    }
    try {
        const decoded = jwt.verify(access_token, secretKey)
        //Mengirim ke ProductController.list
        req.userData = decoded
        next()
    } catch (err) {
        res.status(401).json({
            message: err.message || "User not authenticate!"
        })
    }
}
const authorization = (req, res, next) => {
    console.log("Authorization checked!")
    const getId = req.params.id
    const userId = req.userData.id

    Banner.findByPk(getId)
        .then(Banner => {
            if (!Banner) {
                res.status(404).json({
                    message: "Banner not found!"
                })
            } else if (Banner.UserId !== userId) {
                res.status(404).json({
                    message: "User doesn't have access!"
                })
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

module.exports = {
    authentication, authorization
}