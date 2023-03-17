const express = require("express"); 
const dotenv = require("dotenv"); 
const cors = require("cors"); 
const { Configuration, OpenAIApi } = require("openai"); 
const winston = require("winston"); 
const rateLimit = require("express-rate-limit"); 
const NodeCache = require( "node-cache" ); 
//const passport = require("passport"); 

dotenv.config(); 
const app = express(); 
const port = process.env.PORT || 3000; 
const gptModel = process.env.GPT_MODEL || "gpt-3.5-turbo"; 
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, }); 
const openai = new OpenAIApi(configuration); 

const prompt = [ { role: "assistant", content: "You are a world-class football coach" }, { role: "user", content: "Generate a tactical team strategy to win a game", }, ]; 

//middlewares 
app.use(cors()); 
app.use(express.json()); 

//authentication middlewares 
//app.use(passport.initialize()) 

//rate limiter middleware 
app.use( rateLimit({ 
    windowMs: 1000 * 60, // 1 minute 
    max: 10, // limit each IP to 10 requests per windowMs 
    message: "Too many requests from this IP, please try again after a minute", 
}) ); 

//caching middleware 
const cache = new NodeCache(); 

const cacheMiddleware = (req, res, next) => { 
    const key = req.originalUrl || req.url; 
    const cachedResponse = cache.get(key); 
    if (cachedResponse) { 
        res.send(cachedResponse); 
    } else { 
        res.sendResponse = res.send; 
        res.send = (body) => { cache.set(key, body); 
            res.sendResponse(body); 
        }; 
        next(); 
    } 
}; 

//logger 
const logger = winston.createLogger({ 
    level: "info", 
    format: winston.format.json(), 
    defaultMeta: { service: "user-service" }, 
    transports: [ 
        new winston.transports.File({ filename: "error.log", level: "error", }), 
        new winston.transports.File({ filename: "combined.log", }), 
    ], 
}); 
    
//error handling middleware 
app.use((err, req, res, next) => { 
    logger.error(err); 
    res.status(500).send("Internal server error"); 
}); 

//routes 
app.get("/", cacheMiddleware, async (req, res, next) => { 
    try { 
        const response = await openai.createChatCompletion({ 
            model: gptModel, 
            messages: prompt, 
        }); 
        res.send(response.data.choices[0].message); 
    } catch (error) { 
        logger.error(error); 
        next(error); 
    } 
}); 

app.post("/req", validateRequestBody, async (req, res, next) => { 
    try { 
        const response = await openai.createChatCompletion({ 
            model: gptModel, 
            messages: [ 
                { role: "assistant", content: "You are a world class software engineer who has worked with the javascript language for decades and specialised on nodejs and express. A code base would be given to you to improve upon it based on your expertise", }, { role: "user", content: req.body.data }, 
            ], 
        }); 
        res.send(response.data.choices[0].message); 
    } catch (error) { 
        logger.error(error); 
        next(error); 
    } 
}); 

//middleware function - error checker 
function validateRequestBody(req, res, next) { 
    const { data } = req.body; 
    if (!data || typeof data !== "string") { 
        res.status(400).send("Invalid request body"); 
    } else { 
        next(); 
    } 
} 

app.listen(port, () => { console.log("Server is running on port: ", port); });