import assert from "assert";
import axios, { AxiosRequestHeaders } from "axios";
import "dotenv/config";
import logger from "./logger";

import Business from "./business";

assert(process.env.SLACK_WEBHOOK_URL !== undefined);

const MAX_BODY_PREVIEW_LENGTH = 200;

async function notifyBusinessAdded(business: Business) {
    const payload = {
        "text": business.title,
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": business.title
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*신청기한:* ${business.applicationEndDate.toLocaleDateString('ko-kr')}\n*지원부서:* ${business.department}`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "신청하기"
                    },
                    "style": "primary",
                    "action_id": "button-action",
                    "url": business.url
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": business.bodyText.substring(0, MAX_BODY_PREVIEW_LENGTH),
                }
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