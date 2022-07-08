import 'dotenv/config';
import express, { Request, Response } from 'express';

import * as board from './board';
import * as slack from "./slack";
import * as db from "./database";
import logger from './logger';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    logger.info(`서버가 ${PORT}번 포트에서 listen중입니다...`);
});

app.get('/', (_req: Request, res: Response) => {
    Promise.all([announceNewBusinesses(), announceNewNotices()])
        .then(() => {
            res.status(200).send('게시판 크롤링, 슬랙방 공지를 완료했습니다');
        }).catch((error: Error) => {
            logger.error(error.stack);
            res.status(500).send('작업이 실패했습니다');
        });
});

async function announceNewBusinesses(): Promise<void> {
    const ids = await board.getCurrentBusinessIds();

    const taskList: Promise<void>[] = [];
    for (const id of ids) {
        const task = announceBusiness(id);
        taskList.push(task);
    }

    await Promise.all(taskList);
}

async function announceBusiness(id: number): Promise<void> {
    const business = await board.getBusiness(id);
    const found = await db.findBusiness(business._id);
    if (found === null) {
        Promise.all([slack.notifyBusinessAdded(business), db.insertBusiness(business)]);
    } else {
        logger.info(`이미 알림한 지원사업입니다. ${business.title}`);
    }
}

async function announceNewNotices(): Promise<void> {
    const ids = await board.getCurrentNoticeIds();

    const taskList: Promise<void>[] = [];
    for (const id of ids) {
        const task = announceNotice(id);
        taskList.push(task);
    }

    await Promise.all(taskList);
}

async function announceNotice(id: number): Promise<void> {
    const notice = await board.getNotice(id);
    const found = await db.findNotice(notice._id);
    if (found === null) {
        Promise.all([slack.notifyNoticeAdded(notice), db.insertNotice(notice)]);
    } else {
        logger.info(`이미 알림한 공지사항입니다. ${notice.title}`);
    }
} 