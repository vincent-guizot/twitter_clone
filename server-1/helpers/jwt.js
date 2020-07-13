const jwt = require('jsonwebtoken')
const secretKey = "bebas"

const tokenGenerator = (user) => {
    return jwt.sign({
        id:user.id,
        email:user.name
    }, secretKey)
}

const tokenVerifier = (access_token,secretKey) => {
    return jwt.verify(access_token,secretKey)
}
module.exports = {
    tokenGenerator, tokenVerifier
}