import 'dotenv/config'

import { getSupportProjects } from './board';
import { postMessage } from "./slack";
import { findSupportProject, insertSupportProject } from "./database";

// DEV: 시간을 1시간으로 변경
const HOUR_IN_MS = 1000;

// DEV: setTimeout을 setInterval로 변경
setTimeout(main, HOUR_IN_MS);

async function main(): Promise<void> {
    try {
        const supportProjects = await getSupportProjects();

        for (const p of supportProjects) {
            let found = await findSupportProject(p._id);

            if (found === null) {
                // 새로 게시된 지원사업
                postMessage(p);
                insertSupportProject(p);

                console.log('new project');
            }
            else {
                // 이전에 게시된 지원사업
                // TODO p와 다르면 업데이트

                console.log('already noticed');
            }
        }

    } catch (error) {
        console.error(error);
    };
}