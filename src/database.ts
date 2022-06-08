import assert from "assert";
import { Collection, MongoClient } from "mongodb";
import { SupportProject } from "./supportProject";
import "dotenv/config";

let supportProjects: Collection<SupportProject>;

let mock: SupportProject = {
    "id": 368,
    "title": "신기술 견학(AI Cyber Security Summit 2022)-일정 변경",
    "fromDate": new Date("2022-04-22T00:00:00.000Z"),
    "toDate": new Date("2022-06-28T00:00:00.000Z")
};

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

async function findSupportProject(id: number) {
    let found = await supportProjects.findOne({ id: id });
    if (found === null) {
        return null;
    }
    else {
        return {
            id: found.id,
            title: found.title,
            fromDate: found.fromDate,
            toDate: found.toDate
        }
    }
}

export { insertSupportProject, findSupportProject };