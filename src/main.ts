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
            // TODO: p와 다르면 업데이트
            logger.info(`이미 알림한 지원사업입니다. ${business.title}`);
        }
    }

    res.status(200).send('Successfully request cron job');
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}...`);
})