
// 1. Import express.
import express from 'express';
import OrderController from './order.controller.js';

// 2. Initialize Express router.
const orderRouter = express.Router();

const orderController = new OrderController();

// All the paths to controller methods.
// localhost/api/products

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
orderRouter.post(
  '/',
  (req, res, next)=>{
    orderController.placeOrder(req, res, next)
} 
);
export default orderRouter;