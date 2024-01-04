import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepository{

    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){
        // 1. Get cartitems and calculate total amount.
        const totalAmount = await this.getTotalAmount(userId);
        // 2. Create order record.

        // 3. Reduce the stock.

        // 4. Clear cart items.
    }

    async getTotalAmount(userId){
        const db = getDB();
        // 1. Get the cartitems, map with product and calcultate total.
        const items = await db.collection("cartItems").aggregate([
            // 1. Get cart items for the user.
            {
                $match:{userID:new ObjectId(userId)}
            },

            // 2. Get the prodcust for cartitem.
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            // 3. Unwind productInfo.
            {
                $unwind:"$productInfo"
            },
            // 4. Calculate product price*quantity.
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price", "$quantity"]
                    }
                }
            }
        ]).toArray()
        console.log(items);
        const finalAmount = items.reduce((acc, item)=> acc+item.totalAmount, 0);
        console.log(finalAmount)
    }
}