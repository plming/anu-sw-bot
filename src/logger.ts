import { createLogger, transports, format } from "winston";

const logger = createLogger({

    transports: [new transports.Console()],
    format: format.combine(
        format.printf(({ level, message }) => {
            return `[${level}: ${message}`;
        })
    ),
})

export default logger;
