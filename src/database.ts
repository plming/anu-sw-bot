import { MongoClient } from "mongodb";
import { Notice } from "./entity/notice"
import { Business } from "./entity/business"
import { Webhook } from "./entity/webhook";

const client = new MongoClient(process.env.CUSTOMCONNSTR_ANU_SW_BOT);
const database = client.db('AnuSw');

export const noticeRepository = database.collection<Notice>('notice');
export const businessRepository = database.collection<Business>('business');
export const webhookRepository = database.collection<Webhook>('webhook');