import assert from "assert";
import { Collection, MongoClient } from "mongodb";
import "dotenv/config";

import { Business } from "./business";

let supportProjects: Collection<Business>;

(() => {
    assert(process.env.MONGODB_URI !== undefined);

    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('AnuSw');

    supportProjects = database.collection('business');
})();

async function insertBusiness(supportProject: Business): Promise<void> {
    let result = await supportProjects.insertOne(supportProject);

    if (!result.acknowledged) {
        throw new Error(JSON.stringify(result));
    }
}

async function findBusiness(id: number): Promise<Business | null> {
    return supportProjects.findOne({ _id: id });
}

export { insertBusiness, findBusiness };