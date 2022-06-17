import 'dotenv/config'

import { getSupportProjects } from './board';
import { postMessage } from "./slack";
import { findSupportProject, insertSupportProject } from "./database";
import logger from './logger';

const MINUTE_IN_MS = 1000 * 60;
const HOUR_IN_MS = 1000 * 60 * 60;

setInterval(main, HOUR_IN_MS);

async function main(): Promise<void> {
    try {
        const supportProjectList = await getSupportProjects();

        for (const project of supportProjectList) {
            let found = await findSupportProject(project._id);

            if (found === null) {
                postMessage(project);
                insertSupportProject(project);
            }
            else {
                // TODO: p와 다르면 업데이트
                logger.info(`이미 알림한 지원사업입니다. ${project.title}`);
            }
        }

    } catch (error) {
        logger.error(error);
    };
}