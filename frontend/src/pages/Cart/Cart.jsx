import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, url, foodList, removeFromCart, totalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className='cart'>
     <div className="cart-content">
       <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
       </div>
       <br /> 
       <hr />
       {foodList.map((item,index) => {
            if(cartItems[item._id] > 0) {
                return(
                    <>
                <div key={index} className="cart-items-title cart-items-details">
                <img src={url +"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className='remove-cart-item' >x</p>
                
            </div>
            <hr />
            </>
            )
            }
       })}
       <div className="cart-lower-half">
        <div className="cart-left-bottom">
            <h2>Cart Totals</h2>
            
         
                <div>
                    <p>Subtotal</p>
                    <p>${totalCartAmount() === 0? '0': totalCartAmount()}</p>
                </div>
                <hr />
                <div>
                    <p>Delivery Fee</p>
                    <p>${totalCartAmount() === 0 ? '0' : '2'}</p>
                </div>
                <hr />
                <div>
                    <b>Total</b>
                    <b>${totalCartAmount() === 0 ? '0' : totalCartAmount() + 2}</b>
                </div>
                
                <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-right-bottom">
            <p>if you have a promo code.Enter it here</p>
            <div className="cart-promocode-container">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
       </div>
     </div>
    </div>
  )
}

export default Cart
