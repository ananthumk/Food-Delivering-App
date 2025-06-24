import React, { useContext } from 'react'
import { assets } from '../../assets/assets/frontend_assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, image, price, description }) => {
 
  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)

  return (
    <div className='food-item' id={id}>
      <div className="food-item-img-container">
        <img src={url + '/images/'+ image} alt="" />
        {!cartItems[id] ? 
         <img onClick={() => addToCart(id)} src={assets.add_icon_white} className='add' /> :
          <div className='cart-buttons'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-content">
        <div className="food-item-rating-container">
          <h2>{name}</h2>
          <img src={assets.rating_starts} alt="" className="rating-image" />
        </div>
        <div className="food-item-details-container">
          <p>{description}</p>
          <h3>${price}</h3>
        </div>
      </div>
    </div>
  )
}


export default FoodItem
