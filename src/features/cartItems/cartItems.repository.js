import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";


export default class CartItemsRepository{
   
    constructor(){
        this.collection = "cartItems";
    }


    async get(userID){
        try{
           const db = getDB();
           const collection = db.collection(this.collection);
           const items = collection.find({userID: new ObjectId(userID)}).toArray();
           return items; 
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);   
        }
    }

    async add(productID, userID, quantity){
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        await collection.insertOne({productID:new ObjectId(productID), userID: new ObjectId(userID),
            quantity: quantity});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);   
        }
    }

    async delete(cartItemID, userID){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            console.log(cartItemID);
            console.log(userID);
            
            const result = await collection.deleteOne({userID: new ObjectId(userID), _id:new ObjectId(cartItemID)})
            console.log(result);
            return result.deletedCount>0
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);   
        }
    }
}