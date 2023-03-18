import * as BoardService from './BoardService';
import * as SlackService from "./SlackService";
import Logger from '../util/Logger';
import { noticeRepository } from '../database';

export async function announceNewNotices(): Promise<void> {
    const ids = await BoardService.getCurrentNoticeIds();

    const tasks: Promise<void>[] = [];
    for (const id of ids) {
        const task = announceNotice(id);
        tasks.push(task);
    }

    await Promise.all(tasks);
}

async function announceNotice(id: number): Promise<void> {
    const notice = await BoardService.getNotice(id);
    const found = await noticeRepository.findOne({ _id: notice._id });

    if (found === null) {
        const tasks = [
            SlackService.notifyNoticeAdded(notice),
            noticeRepository.insertOne(notice)
        ];
        await Promise.all(tasks);
    } else {
        Logger.info(`이미 알림한 공지사항입니다. ${notice.title}`);
    }
}