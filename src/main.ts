import express, { Request, Response } from 'express';

import Logger from './util/Logger';
import { announceNewBusinesses } from './service/BusinessService';
import { announceNewNotices } from './service/NoticeService';

const app = express();

// 이 앱의 유일한 endpoint
app.get('/', (_req: Request, res: Response) => {
    Promise.all([announceNewBusinesses(), announceNewNotices()])
        .then(() => {
            res.status(200).send('게시판 크롤링, 슬랙방 공지를 완료했습니다');
        }).catch((error: Error) => {
            Logger.error(error.stack);
            res.status(500).send('작업이 실패했습니다');
        });
});

app.get("/slack/oauth", (req: Request, res: Response) => {
    const code = req.query.code;
    const state = req.query.state;
    const error = req.query.error;
    const error_description = req.query.error_description;

    if (code === undefined) {
        Logger.error(`슬랙 인증 실패: ${error} - ${error_description}`);
        res.status(500).send('슬랙 인증에 실패했습니다');
    } else {
        Logger.info(`슬랙 인증 성공: ${code} - ${state}`);
        res.status(200).send('슬랙 인증에 성공했습니다');
    }
});

app.listen(process.env.PORT, () => {
    Logger.info(`서버가 ${process.env.PORT}번 포트에서 listen중입니다...`);
});