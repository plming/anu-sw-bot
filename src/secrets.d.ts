declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        SLACK_WEBHOOK_URL: string;
        CUSTOMCONNSTR_ANU_SW_BOT: string;
    }
}
