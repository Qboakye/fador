const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const {getResponse, getEmailResponse} = require("../controllers/openai")
const {validateRequestBody} = require("../helpers/utils")
const logger = require("../helpers/logger")
const {authTokenUser} = require("../helpers/auth")

//HomePage
router.get('/', async (req, res) => {
    try {
        const response  = await getResponse()
        const message = response.data.choices[0].message
        res.send(message)
        logger.info("queried API successfully: " + message) 
    } catch (error) {
        logger.error(error)
        res.status(500).send("Internal server error")
    }
})

//API request
router.post("/req", authTokenUser, validateRequestBody, async (req, res) => {
    try {
        const response = await getEmailResponse(req.body.data.trim())
        const message = response.data.choices[0].message
        res.send(message)
        logger.info(`queried API successfully: at ${new Date().toUTCString()} `) 
    } catch (error) {
        logger.error(error)
        res.send(error)
    }
})

//Log-out
router.get("/logout", authTokenUser, async (req, res) => {
    try {
        res.cookie("jwt", "token",{
            maxAge: 1, 
            httpOnly: true, 
            sameSite: "none", 
            secure: true
        })
        logger.info("logged out successfully") 
        res.sendStatus(200)
    } catch (error) {
        logger.error(error)
        res.send(error)
    }
})

//Register User
router.post("/register", async (req, res) => {
    const maxAge = 60 * 60 * 24
    try {
        const token = jwt.sign({ user_id: req.body.userId },process.env.TOKEN_KEY,
            { expiresIn: maxAge * 1000 }
        );
         res.cookie("jwt", token,{
            maxAge, 
            httpOnly: true, 
            sameSite: "none", 
            secure: true
        })
        res.status(200).json({token})
        logger.info("Registered user and set cookie successfully");
    } catch (error) {
        logger.error(error)
        res.status(500).send("Internal server error")
    }
})

//Login User
router.post("/login", async (req, res) => {
    const maxAge = 60 * 60 * 24
    try {
        const token = jwt.sign({ user_id: req.body.userId },process.env.TOKEN_KEY,
            { expiresIn: maxAge * 1000 }
        );
         res.cookie("jwt", token,{
            maxAge, 
            httpOnly: true, 
            sameSite: "none", 
            secure: true
        })
        res.status(200).json({token})
        logger.info("Logged user in and set cookie successfully");
    } catch (error) {
        logger.error(error)
        res.status(500).send("Internal server error")
    }
})

module.exports = router