const jwt = require("jsonwebtoken")
const logger = require("./logger")

const authTokenUser = (req, res, next) =>{
    const token = req.cookies.jwt

    if(token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err) => {
            if(err){
                logger.log(err)
                res.send(err.message)
            } else {
                next()
            }
        })
    } else {
        logger.error("no token saved")
        res.send("no token saved")
    }
}

module.exports = {
    authTokenUser
}