import { createLogger, transports, format } from "winston";

export default createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.printf(({ level, message }) => {
            return `${level}: ${message}`;
        })
    ),
});
