import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

//configure env
dotenv.config();

// Get MongoDB URI
const uri = process.env.MONGO_URI as string;

let mongoClient: any = null;

declare global {
    namespace globalThis {
    var _mongoClient: Promise<MongoClient>
    }
}

// Check if MONGO_URI is present or not
if(!process.env.MONGO_URI) {
    throw new Error('Please add your Mongo URI')
}

// Function to connect MongoDB
export async function mongoDBClient() {
    try {
        if(mongoClient) {
            const db = mongoClient.db(process.env.MONGODB_DB_NAME);
            return db;
        }

        if(!global._mongoClient) {
            mongoClient = await (new MongoClient(uri)).connect();
            global._mongoClient = mongoClient;
        } 
        else {
            mongoClient = global._mongoClient;
        }
        
        const db = mongoClient.db(process.env.MONGODB_DB_NAME);

        return db;
    } 
    catch (e) {
        console.error(e);
    }
}