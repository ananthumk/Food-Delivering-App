import express from "express";
import { addCart, removeCart, fetchCart } from "../controllers/cartController.js";
import userMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", userMiddleware, addCart);
cartRouter.post("/remove", userMiddleware, removeCart);
cartRouter.get("/get", userMiddleware, fetchCart);

export default cartRouter;