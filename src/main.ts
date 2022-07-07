import 'dotenv/config';
import express from 'express';

import * as board from './board';
import * as slack from "./slack";
import * as db from "./database";
import logger from './logger';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    logger.info(`서버가 ${PORT}번 포트에서 listen중입니다...`);
});

app.get('/', (_req, res) => {
    Promise.all([handleBusiness(), handleNotice()])
        .then(() => {
            res.status(200).send('게시판 크롤링, 슬랙방 공지를 완료했습니다');
        }).catch(() => {
            res.status(500).send('작업이 실패했습니다');
        })
});

async function handleBusiness() {
    const businesses = await board.getBusinesses();
    for (const business of businesses) {
        let found = await db.findBusiness(business._id);

        if (found === null) {
            await slack.notifyBusinessAdded(business);
            await db.insertBusiness(business);
        }
        else {
            logger.info(`이미 알림한 지원사업입니다. ${business.title}`);
        }
    }
}

async function handleNotice() {
    const notices = await board.getNotices();
    for (const notice of notices) {
        let found = await db.findNotice(notice._id);

        if (found === null) {
            await slack.notifyNoticeAdded(notice);
            await db.insertNotice(notice);
        }
        else {
            logger.info(`이미 알림한 공지사항입니다. ${notice.title}`);
        }
    }
}