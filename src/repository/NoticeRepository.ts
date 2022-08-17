import assert from "node:assert";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { Notice, INotice } from "../entity/Notice";

assert(process.env.MONGODB_URI !== undefined);

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db('AnuSw');
const notices = database.collection<INotice>('notice');

export async function findNotice(id: number): Promise<Notice | null> {
    let found = await notices.findOne({ _id: id });
    return found === null ? null : new Notice(
        found._id,
        found.title,
        found.bodyText,
        found.author,
        found.createdAt
    )
}

export async function insertNotice(notice: Notice): Promise<void> {
    let result = await notices.insertOne(notice);
    assert(result.acknowledged);
}