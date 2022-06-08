import assert from "assert";
import 'dotenv/config'

import { getSupportProjects } from './board';
import { postNotice } from "./slack";
import { findSupportProject, insertSupportProject } from "./database";

// DEV: 시간을 1시간으로 변경
const HOUR_IN_MS = 1000;

assert(process.env.SLACK_WEBHOOK_URL !== undefined);

// DEV: setTimeout을 setInterval로 변경
setTimeout(main, HOUR_IN_MS);

async function main(): Promise<void> {
    try {
        const supportProjects = await getSupportProjects();

        for (const project of supportProjects) {
            let found = await findSupportProject(project.id);
            if (found === null) {
                postNotice(project);
            }
            else {
                insertSupportProject(project);
            }
        }

    } catch (error) {
        console.error(error);
    };
}

