import 'dotenv/config';
import express, { Request, Response } from 'express';

import logger from './util/Logger';
import { announceNewBusinesses } from './service/BusinessService';
import { announceNewNotices } from './service/NoticeService';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    logger.info(`서버가 ${PORT}번 포트에서 listen중입니다...`);
});

app.get('/', (_req: Request, res: Response) => {
    const tasks = [announceNewBusinesses(), announceNewNotices()];
    Promise.all(tasks)
        .then(() => {
            res.status(200).send('게시판 크롤링, 슬랙방 공지를 완료했습니다');
        }).catch((error: Error) => {
            logger.error(error.stack);
            res.status(500).send('작업이 실패했습니다');
        });
});