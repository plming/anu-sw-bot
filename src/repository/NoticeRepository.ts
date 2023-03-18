import { MongoClient } from "mongodb";
import { Notice } from "../entity/Notice";

const client = new MongoClient(process.env.CUSTOMCONNSTR_ANU_SW_BOT);
const database = client.db('AnuSw');
const notices = database.collection<Notice>('notice');

export async function findNotice(id: number): Promise<Notice | null> {
    const found = await notices.findOne({ _id: id });
    return found;
}

export async function insertNotice(notice: Notice): Promise<void> {
    await notices.insertOne(notice);
}