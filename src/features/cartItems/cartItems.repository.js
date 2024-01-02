import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


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

    async add(productID, userID, newQuantity){
        try{
        const db = getDB();
        const collection = db.collection(this.collection);
        const updatedCounter = await this.getTheNextCounter(db);
        const id=updatedCounter.value.value;
        // 1. Get the existing quantity for the user and product.
        // 2. Calculate the new quantity = existingQuantity+quantity
        // 3. Update the product.
        // 4. If there is no cart item then add the record.
        
        await collection.updateOne(
            {productID: new ObjectId(productID), userID: new ObjectId(userID)},
            {
                $setOnInsert:{_id:id},
                $inc:{quantity: newQuantity}
            },
            {
                upsert:true
            }
        )

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

    async getTheNextCounter(db){
        const result = await db.collection("counters").findOneAndUpdate({
            _id:'cartItemId'
        },{
            $inc:{value:1}
        },{
            returnDocument:'after'
        });
        console.log(result);
        return result
    }
}