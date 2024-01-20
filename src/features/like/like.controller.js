import { LikeRepository } from "./like.repository";

export class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async likeItem(req, res, next){
        try{
            const {id, type} = req.body;
            const userId=req.userID;
            if(type!='Product' && type!='Category'){
                return res.status(400).send('Invalid Type');
            }
            if(type=='Product'){
                this.likeRepository.likeProduct(userId, id);
            }
            else{
                this.likeRepository.likeCategory(userId, id);
            }
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
  }
    }
}