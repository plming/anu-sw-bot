import 'dotenv/config';
import express from 'express';

import { getSupportProjects } from './board';
import { notifySupportProjectAdded } from "./slack";
import { findSupportProject, insertSupportProject } from "./database";
import logger from './logger';

const app = express();
const PORT = process.env.PORT ?? 8080;

app.get('/run', async (req, res) => {
    const supportProjectList = await getSupportProjects();

    for (const project of supportProjectList) {
        let found = await findSupportProject(project._id);

        if (found === null) {
            notifySupportProjectAdded(project);
            insertSupportProject(project);
        }
        else {
            // TODO: p와 다르면 업데이트
            logger.info(`이미 알림한 지원사업입니다. ${project.title}`);
        }
    }

    res.status(200).send('Successfully request cron job');
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}...`);
})