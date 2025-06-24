import userModel from '../models/userModel.js'

// Add Cart Item
const addCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.userId)
        const cartData = userData.cartData

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message: "Item added to cart"})
    } catch(error) {
        console.log(error)
        res.json({success: false, message: "Internal server error"})
    }
}

// Remove Cart Item
const removeCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.userId)
        const cartData = userData.cartData
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData});
        res.json({success: true, message: 'Item removed from cart'})
    } catch (error) {
        console.log(error)
        res.json({message: false, message: "Internal server error"})
    }
}

//fetch cart data 
const fetchCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.userId)
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"})
        }
        const cartData = userData.cartData

        res.json({success: true, cartData})
    } catch (error) {
        console.log("Error fetching cart:", error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

export {addCart, removeCart, fetchCart}
