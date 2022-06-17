import { createLogger, transports, format } from "winston";

const logger = createLogger({

    transports: [new transports.Console()],
    format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
            return `[${level}: ${message}`;
        })
    ),
})

export default logger;
