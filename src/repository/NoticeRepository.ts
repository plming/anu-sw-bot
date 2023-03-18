import assert from "node:assert";
import { MongoClient } from "mongodb";
import "dotenv/config";

import Notice from "../entity/Notice";

assert(process.env.CUSTOMCONNSTR_ANU_SW_BOT !== undefined);

const client = new MongoClient(process.env.CUSTOMCONNSTR_ANU_SW_BOT);
const database = client.db('AnuSw');
const notices = database.collection<Notice>('notice');

export async function findNotice(id: number): Promise<Notice | null> {
    const found = await notices.findOne({ _id: id });

    return found === null ? null : new Notice(
        found._id,
        found.title,
        found.bodyText,
        found.author,
        found.createdAt
    )
}

export async function insertNotice(notice: Notice): Promise<void> {
    await notices.insertOne(notice);
}