import mongoose from "mongoose";
import { likeSchema } from "./like.schema";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model('Like', likeSchema);

export class LikeRepository{

    async likeProduct(userId, productId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable:new ObjectId(productId),
                types:'Product'
            });
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);   
        }
    }

    async likeCategory(userId, categoryId){
        try{
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable:new ObjectId(categoryId),
                types:'Category'
            });
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);   
        }
    }
    
}