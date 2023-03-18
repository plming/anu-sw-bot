import axios from 'axios';
import express, { Request, Response } from 'express';

import Logger from './util/Logger';
import { announceNewBusinesses } from './service/BusinessService';
import { announceNewNotices } from './service/NoticeService';
import { userRepository } from './database';

const app = express();

app.get('/', (_req: Request, res: Response) => {
    Promise.all([announceNewBusinesses(), announceNewNotices()])
        .then(() => {
            res.status(200).send('게시판 크롤링, 슬랙방 공지를 완료했습니다');
        }).catch((error: Error) => {
            Logger.error(error.stack);
            res.status(500).send('작업이 실패했습니다');
        });
});

app.get("/slack/oauth", async (req: Request, res: Response) => {
    if (req.query.code === undefined) {
        res.status(400).send("code가 없습니다");
        return;
    }

    const response = await axios.post("https://slack.com/api/oauth.v2.access", {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: "https://anuswbot.azurewebsites.net/slack/oauth",
    });

    if (response.data.ok === false) {
        res.status(400).send(JSON.stringify(response.data));
        return;
    }

    const userId = response.data.authed_user.id;
    const accessToken = response.data.authed_user.access_token;

    try {
        await userRepository.insertOne({
            _id: userId,
            access_token: accessToken
        });
    } catch (error) {
        Logger.error(error);
        res.status(500).send("DB 저장에 실패했습니다");
        return;
    }

    res.status(200).send("성공적으로 슬랙 앱을 설치했습니다");
});

app.listen(process.env.PORT, () => {
    Logger.info(`서버가 ${process.env.PORT}번 포트에서 listen중입니다...`);
});