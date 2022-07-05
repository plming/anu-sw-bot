import assert from "node:assert";
import { Collection, MongoClient } from "mongodb";
import "dotenv/config";

import Business, { IBusiness } from "./business";
import Notice from "./notice";

let businesses: Collection<IBusiness>;
let notices: Collection<Notice>;

(() => {
    assert(process.env.MONGODB_URI !== undefined);

    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('AnuSw');

    businesses = database.collection('business');
    notices = database.collection('notice');
})();

async function findBusiness(id: number): Promise<Business | null> {
    let found = await businesses.findOne({ _id: id });
    if (found === null) {
        return null;
    } else {
        return new Business(
            found._id,
            found.title,
            found.department,
            found.bodyText,
            found.applicationStartDate,
            found.applicationEndDate
        )
    }
};

async function insertBusiness(business: Business): Promise<void> {
    let result = await businesses.insertOne(business);
    assert(result.acknowledged);
};

async function findNotice(id: number): Promise<Notice | null> {
    return notices.findOne({ _id: id });
}

async function insertNotice(notice: Notice): Promise<void> {
    let result = await notices.insertOne(notice);
    assert(result.acknowledged);
};

export {
    findBusiness,
    insertBusiness,
    findNotice,
    insertNotice,
};