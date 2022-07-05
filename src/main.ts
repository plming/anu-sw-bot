import 'dotenv/config';
import express from 'express';

import * as board from './board';
import * as slack from "./slack";
import * as db from "./database";
import logger from './logger';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.get('/run', async (_req, res) => {
    const businesses = await board.getBusinesses();
    for (const business of businesses) {
        let found = await db.findBusiness(business._id);

        if (found === null) {
            slack.notifyBusinessAdded(business);
            db.insertBusiness(business);
        }
        else {
            logger.info(`이미 알림한 지원사업입니다. ${business.title}`);
        }
    }

    const notices = await board.getNotices();
    for (const notice of notices) {
        let found = await db.findNotice(notice._id);

        if (found === null) {
            slack.notifyNoticeAdded(notice);
            db.insertNotice(notice);
        }
        else {
            logger.info(`이미 알림한 공지사항입니다. ${notice.title}`);
        }
    }

    res.status(200).send('게시판 크롤링 및 슬랙방 공지를 완료했습니다');
});

app.listen(PORT, () => {
    logger.info(`서버가 ${PORT}번 포트에서 listen중입니다...`);
})