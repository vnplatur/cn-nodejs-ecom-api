import { ObjectId } from 'mongodb';
import OrderModel from './order.model.js';


export default class OrderRepository {
constructor() {
this.collectionName = 'orders';
}

async placeOrder(userID){

    // 1. Get cart items and calculate total amount

    // 2. Create order record.

    // 3. Reduce the stock.

    // 4. Clear the cart items.
}

}