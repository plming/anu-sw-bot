import assert from "assert";
import axios, { AxiosRequestHeaders } from "axios";
import "dotenv/config";

import { SupportProject } from "./supportProject";

assert(process.env.SLACK_WEBHOOK_URL !== undefined);

async function postMessage(supportProject: SupportProject) {
    const payload = {
        text: supportProject.title,
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: supportProject.title
                }
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `*신청기한:*\n${supportProject.toDate.toLocaleDateString('ko-kr')}`
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
                        url: supportProject.url
                    }
                ]
            }
        ]
    }

    const headers: AxiosRequestHeaders = {
        'Content-type': 'application/json'
    }

    await axios.post(process.env.SLACK_WEBHOOK_URL, payload, headers);
}

export { postMessage };