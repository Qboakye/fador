const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const dotenv = require("dotenv").config()

const logger = require("./helpers/logger")
const rateLimiter = require("./helpers/rateLimit")

const app = express()
const router = require("./routes/routes")

const port = process.env.PORT || 3000

app.use(helmet())
app.use(rateLimiter)
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5500"
}))
app.use(express.json())
app.use(cookieParser())

app.use("/", router)

app.listen(port,()=>{
    logger.info(`Server is running on http://127.0.0.1:${port}/`) 
})