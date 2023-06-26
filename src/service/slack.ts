import axios from "axios";

import { Business, getBusinessUrl } from "../entity/business";
import { Notice, getNoticeUrl } from "../entity/notice";
import { webhookRepository } from "../database";

async function broadcast(payload: object) {
    const headers = {
        "Content-Type": "application/json"
    }

    const webhooks = await webhookRepository.find({}, { projection: { url: 1, _id: 0 } }).toArray();
    const tasks = webhooks.map(webhook => axios.post(webhook.url, payload, { headers: headers }));

    await Promise.all(tasks);
}

export async function notifyBusinessAdded(business: Business) {
    const payload = {
        "text": `📄 ${business.title}`,
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `📄 ${business.title}`
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
                    "url": getBusinessUrl(business._id)
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": business.bodyText
                }
            }
        ]
    }

    await broadcast(payload);
    console.log(`슬랙방에 게시 완료 - 지원사업: ${business.title}`);
}

export async function notifyNoticeAdded(notice: Notice) {
    const payload = {
        "text": `📢 ${notice.title}`,
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `📢 ${notice.title}`
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*지원부서:* ${notice.author}`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "확인하기"
                    },
                    "style": "primary",
                    "action_id": "button-action",
                    "url": getNoticeUrl(notice._id)
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": notice.bodyText
                }
            }
        ]
    }

    await broadcast(payload);
    console.log(`슬랙방에 게시 완료 - 공지사항: ${notice.title}`);
}
