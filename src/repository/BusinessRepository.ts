import assert from "node:assert";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { Business, IBusiness } from "../entity/Business";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db('AnuSw');
const businesses = database.collection<IBusiness>('business');

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