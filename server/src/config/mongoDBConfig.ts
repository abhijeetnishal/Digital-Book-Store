import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

//configure env
dotenv.config();

// Get MongoDB URI
const uri = process.env.MONGO_URI as string;

// Define connection options
const options: any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

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
export async function MongoDBClient() {
    try {
        if(mongoClient) {
            return mongoClient;
        }

        if(!global._mongoClient) {
            mongoClient = await (new MongoClient(uri, options)).connect();
            global._mongoClient = mongoClient;
        } 
        else {
            mongoClient = global._mongoClient;
        }
        
        return mongoClient;
    } 
    catch (e) {
        console.error(e);
    }
}