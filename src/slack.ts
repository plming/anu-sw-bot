import assert from "assert";
import axios, { AxiosRequestHeaders } from "axios";
import "dotenv/config";
import logger from "./logger";

import { Business } from "./business";

assert(process.env.SLACK_WEBHOOK_URL !== undefined);

async function notifyBusinessAdded(business: Business) {
    const payload = {
        text: business.title,
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: business.title
                }
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*신청기한:*\n${business.applicationEndDate.toLocaleDateString('ko-kr')}`
                    }
                ]
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "신청하기"
                        },
                        style: "primary",
                        url: business.url
                    }
                ]
            }
        ]
    }

    const headers: AxiosRequestHeaders = {
        'Content-type': 'application/json'
    }

    await axios.post(process.env.SLACK_WEBHOOK_URL, payload, headers);
    logger.info(`슬랙 봇에 신규 공지 - 지원사업: ${business.title}`);
}


export { notifyBusinessAdded };