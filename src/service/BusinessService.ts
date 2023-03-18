import * as BoardService from './BoardService';
import * as SlackService from "./SlackService";
import { businessRepository } from '../database';

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
    const found = await businessRepository.findOne({ _id: business._id });

    if (found === null) {
        const tasks = [
            SlackService.notifyBusinessAdded(business),
            businessRepository.insertOne(business)
        ];
        await Promise.all(tasks);
    } else {
        console.log(`이미 알림한 지원사업입니다. ${business.title}`);
    }
}