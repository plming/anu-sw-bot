import assert from "node:assert";
import { MongoClient } from "mongodb";
import "dotenv/config";

import Business from "../entity/Business";

assert(process.env.MONGODB_URI !== undefined);

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db('AnuSw');
const businesses = database.collection<Business>('business');

export async function findBusiness(id: number): Promise<Business | null> {
    const found = await businesses.findOne({ _id: id });

    return found === null ? null : new Business(
        found._id,
        found.title,
        found.department,
        found.bodyText,
        found.applicationStartDate,
        found.applicationEndDate,
    );
}

export async function insertBusiness(business: Business): Promise<void> {
    await businesses.insertOne(business);
}