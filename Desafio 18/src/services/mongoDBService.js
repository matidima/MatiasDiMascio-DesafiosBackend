import { config } from '../config/config.js'
import mongoose from "mongoose";

const init = async () => {
    mongoose.set('strictQuery', false)
    try {
        mongoose.connect(config.DATABASE.mongo.dburl, {
            dbName: config.DATABASE.mongo.dbName
        })

        /* console.log('Connection with MongoDB succesful'); */
    } catch (error) {
        console.log(error);
    }
}

export const MongoDBService = { init }