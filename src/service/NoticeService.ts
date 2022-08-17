import * as board from './BoardService';
import * as slack from "./SlackService";
import logger from '../util/Logger';
import * as NoticeRepository from "../repository/NoticeRepository";

export async function announceNewNotices(): Promise<void> {
    const ids = await board.getCurrentNoticeIds();

    const tasks: Promise<void>[] = [];
    for (const id of ids) {
        const task = announceNotice(id);
        tasks.push(task);
    }

    await Promise.all(tasks);
}

async function announceNotice(id: number): Promise<void> {
    const notice = await board.getNotice(id);
    const found = await NoticeRepository.findNotice(notice._id);
    if (found === null) {
        const tasks = [slack.notifyNoticeAdded(notice), NoticeRepository.insertNotice(notice)];
        Promise.all(tasks);
    } else {
        logger.info(`이미 알림한 공지사항입니다. ${notice.title}`);
    }
}