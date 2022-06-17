declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        SLACK_WEBHOOK_URL: string;
        MONGODB_URI: string;
    }
}
