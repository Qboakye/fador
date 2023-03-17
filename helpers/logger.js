const winston = require("winston"); 
const { combine, timestamp, printf,json, colorize } = winston.format;

const logger = winston.createLogger({ 
    level: "info", 
    format: combine(
        timestamp({format: 'YYYY-MM-DD hh:mm:ss'}), 
        json(),
        colorize({all: true}),
        printf(({timestamp, level, message}) => `[${timestamp}] ${level}: ${message}`)
        ), 
    defaultMeta: { service: "user-service" }, 
    transports: [new winston.transports.Console()], 
}); 

module.exports = logger