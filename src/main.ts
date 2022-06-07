import assert from "assert";
import 'dotenv/config'

import { getSupportProjects } from './board';
import { postNotice } from "./slack";

// DEV: 시간을 1시간으로 변경
const HOUR_IN_MS = 1000;

assert(process.env.SLACK_WEBHOOK_URL !== undefined);

// DEV: setTimeout을 setInterval로 변경
setTimeout(main, HOUR_IN_MS);

async function main(): Promise<void> {
    try {
        const supportProjects = await getSupportProjects();

        // TODO DB 만들기

        // TODO 슬랙방에 메시지 전송

        // TODO DB에 저장


    } catch (error) {
        console.error(error);
    };
}

