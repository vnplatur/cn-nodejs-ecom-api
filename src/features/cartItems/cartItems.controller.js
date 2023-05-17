import CartIemModel from './cartItems.model.js';

export class CartItemsController {
  add(req, res) {
    const { productID, quantity } = req.query;
    const userID = req.userID;
    CartIemModel.add(productID, userID, quantity);
    res.status(201).send('Cart is updated');
  }
}
