import CartIemModel from './cartItems.model.js';
import CartItemsRepository from './cartItems.repository.js';

export class CartItemsController {

  constructor(){
    this.cartItemsRepository = new CartItemsRepository();
  }

  async add(req, res) {
    try{
    const { productID, quantity } = req.body;
    const userID = req.userID;
    await this.cartItemsRepository.add(productID, userID, quantity);
    res.status(201).send('Cart is updated');
    }catch(err){
      console.log(err);
      return res.status(503).send("Something went wrong");
    }
  }

  async get(req, res) {
    try{
      const userID = req.userID;
      const result = await this.cartItemsRepository.get(userID);
      res.status(200).send(result);
      }catch(err){
        console.log(err);
        return res.status(503).send("Something went wrong");
      }
  }

  async delete(req, res) {
    try{
      const userID = req.userID;
      const cartItemID = req.params.id;
      const deleted = await this.cartItemsRepository.delete(cartItemID, userID);
      if(deleted){
        return res.status(200).send("Item is removed");
      }else{
        return res.status(401).send("Item not found");
      }
      }catch(err){
        console.log(err);
        return res.status(503).send("Something went wrong");
      }
}
}
