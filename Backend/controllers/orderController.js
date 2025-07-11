import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js"; 
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// place order for frontend
const placeOrder = async ( req, res ) => {
    try {
        
        const frontend_url = 'http://localhost:5174'

        const newOrder =  new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.userId, {cartData: {}})

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name || "food item",
                },
                unit_amount: item.price * 100 * 83,
            },
            quantity: item.quantity 
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*83
            },
            quantity: 1
        })

        const sesssion = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        
        res.json({success: true, session_url: sesssion.url})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Internal server error"})
    }
}

const verifyOrder = async (req , res) => {
    const {orderId, success} = req.body;
    
    try {
        if(success){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Paid"})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "Not paid"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Internal server error"})
    }
} 

const fetchOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.userId})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//List of ORDER
const listOrder = async ( req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

//update order status 
const updateOrderStatus = async ( req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: "Order status updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export { placeOrder , verifyOrder, fetchOrder, listOrder, updateOrderStatus };