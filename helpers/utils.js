const logger = require("./logger")

//middleware function - error checker
function validateRequestBody(req, res, next){
    const {data} = req.body;
    if(!data || typeof data !== "string") {
        logger.error("Invalid request body")
        res.status(400).send("Invalid request body")
    }else{
        logger.info("Valid request body") 
        next()
    }
}

module.exports = {
    validateRequestBody,
}