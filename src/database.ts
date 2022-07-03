import assert from "node:assert";
import { Collection, MongoClient } from "mongodb";
import "dotenv/config";

import Business from "./business";
import Notice from "./notice";

let businesses: Collection<Business>;
let notices: Collection<Notice>;

(() => {
    assert(process.env.MONGODB_URI !== undefined);

    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('AnuSw');

    businesses = database.collection('business');
    notices = database.collection('notice');
})();

async function findBusiness(id: number): Promise<Business | null> {
    return businesses.findOne({ _id: id });
};

async function insertBusiness(business: Business): Promise<void> {
    let result = await businesses.insertOne(business);

    if (!result.acknowledged) {
        throw new Error(JSON.stringify(result));
    }
};

async function findNotice(id: number): Promise<Notice | null> {
    return notices.findOne({ _id: id });
}

async function insertNotice(notice: Notice): Promise<void> {
    let result = await notices.insertOne(notice);

    if (!result.acknowledged) {
        throw new Error(JSON.stringify(result));
    }
};

export {
    findBusiness,
    insertBusiness,
    findNotice,
    insertNotice,
};