
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client=null;

export const connectToMongoDB = ()=>{
    // Connecting to mongodb, it returns instance of client.
    MongoClient.connect(url)
        .then(clientInstance=>{
            client=clientInstance;
            console.log("Mongodb is connected");
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    return client.db();
}

