import argv from "../utils/minimist.js";
import dotenv from "dotenv";
dotenv.config()

const config = {
    SERVER:{
        PORT: process.env.PORT || argv.PORT
    },
    DATABASE: {
        mongo: {
            dburl: process.env.MONGO_DB_URL ,
            dbName: process.env.NAME
        }
    }
}

export { config }