import express from 'express';
import { fetchOrder, listOrder, placeOrder, updateOrderStatus, verifyOrder } from '../controllers/orderController.js';
import userMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/place', userMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/fetchorder', userMiddleware, fetchOrder)
orderRouter.get('/getorders', listOrder)
orderRouter.post('/status', updateOrderStatus)

export default orderRouter
