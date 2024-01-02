
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;
console.log("URL: "+url);

let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
        .then(async clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected");
            await createCounter(client.db())
            await createIndexes(client.db());
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getDB = ()=>{
    return client.db();
}

const createCounter = async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId', value:0});
    }
    console.log("Counter verified");
}

const createIndexes = async(db)=>{
    try{
        // 1. Single-field index
        await db.collection("products").createIndex({name: 1});
        // 2. Compound Index.
        await db.collection("products").createIndex({category: 1, price:-1});
        // 3. Text index.
        await db.collection("products").createIndex({desc:"text"})
    }catch(err){
        console.log(err);
    }
    console.log("Indexes are created");
}