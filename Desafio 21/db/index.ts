import { MongoClient,config } from "../deps.ts";
import {IProduct} from '../types/products.ts'
const { MONGO_DB_URL, MONGO_DB_NAME } = config()
const client = new MongoClient();
await client.connect(MONGO_DB_URL);
const db = client.database(MONGO_DB_NAME);
export const productDB =  db.collection<IProduct>(MONGO_DB_NAME);