import assert from "node:assert";
import { MongoClient } from "mongodb";
import "dotenv/config";

import { Business, IBusiness } from "./business";
import { Notice, INotice } from "./notice";

assert(process.env.MONGODB_URI !== undefined);

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db('AnuSw');

let businesses = database.collection<IBusiness>('business');
let notices = database.collection<INotice>('notice');

export async function findBusiness(id: number): Promise<Business | null> {
    let found = await businesses.findOne({ _id: id });
    return found === null ? null : new Business(
        found._id,
        found.title,
        found.department,
        found.bodyText,
        found.applicationStartDate,
        found.applicationEndDate
    )
}

export async function insertBusiness(business: Business): Promise<void> {
    let result = await businesses.insertOne(business);
    assert(result.acknowledged);
}

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