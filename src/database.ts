import assert from "assert";
import { Collection, MongoClient } from "mongodb";
import { SupportProject } from "./supportProject";
import "dotenv/config";

let supportProjects: Collection<SupportProject>;

(async () => {
    assert(process.env.MONGODB_URI !== undefined);

    const client = new MongoClient(process.env.MONGODB_URI);
    const database = client.db('AnuSw');

    supportProjects = database.collection('supportProject');
})();

async function insertSupportProject(supportProject: SupportProject) {
    let result = await supportProjects.insertOne(supportProject);

    if (!result.acknowledged) {
        throw new Error(JSON.stringify(result));
    }
}

async function findSupportProject(id: number): Promise<SupportProject | null> {
    let found = await supportProjects.findOne({ _id: id });

    return found;
}

export { insertSupportProject, findSupportProject };