import * as BoardService from './BoardService';
import Logger from '../util/Logger';
import * as SlackService from "./SlackService";
import * as BusinessRepository from "../repository/BusinessRepository";

export async function announceNewBusinesses(): Promise<void> {
    const ids = await BoardService.getCurrentBusinessIds();

    const tasks: Promise<void>[] = [];
    for (const id of ids) {
        const task = announceBusiness(id);
        tasks.push(task);
    }

    await Promise.all(tasks);
}

async function announceBusiness(id: number): Promise<void> {
    const business = await BoardService.getBusiness(id);
    const found = await BusinessRepository.findBusiness(business._id);
    if (found === null) {
        const tasks = [SlackService.notifyBusinessAdded(business), BusinessRepository.insertBusiness(business)];
        Promise.all(tasks);
    } else {
        Logger.info(`이미 알림한 지원사업입니다. ${business.title}`);
    }
}