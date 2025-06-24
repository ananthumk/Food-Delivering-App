import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {totalCartAmount,token,foodList,cartItems,url} = useContext(StoreContext)
  const [data , setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  })

  const onChangeHandlers = (event) => {
    const name = event.target.name 
    const value = event.target.value 
    setData({...data,[name]: value})
  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
       navigate('/cart')
    } else if (totalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  const onsubmitHandlers = async (event) => {
     event.preventDefault()
     let orderItems = []
     
     console.log('Button clicked to payament')

     foodList.map((item) => {
      if(cartItems[item._id] > 0) {
        const itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]  
        orderItems.push(itemInfo)
      }})

      let orderData = {
        address: data,
        amount: totalCartAmount() + 2,
        items: orderItems
      }

      const response = await axios.post(`${url}/api/order/place`, orderData, {headers:{token}});
      if(response.data.success){
        const {session_url} = response.data
        window.location.replace(session_url)
      } else {
        alert("Something went wrong")
      }
     
  }

  return (
    <div className='place-order'>
       <div className="user-details-container">
        <h2>Delivery Information</h2>
        <form onSubmit={onsubmitHandlers} className="user-details-input">
        <div className="user-inputs-container">
          <div className="two-input-container">
            <input onChange={onChangeHandlers} name="firstName" value={data.firstName} type="text" placeholder='Frist name' required />
            <input onChange={onChangeHandlers} name="lastName" value={data.lastName} type="text" placeholder='Last name' required/>
          </div>
          <input onChange={onChangeHandlers} name="email" value={data.email} type="email" placeholder='Email address' required />
          <input onChange={onChangeHandlers} name="street" value={data.street} type="text" placeholder='Street' required />
          <div className="two-input-container">
            <input onChange={onChangeHandlers} name="city" value={data.city} type="text" placeholder='City' required />
            <input onChange={onChangeHandlers} name="state" value={data.state} type="text" placeholder='State' required/>
          </div>
          <div className="two-input-container">
            <input onChange={onChangeHandlers} name="zipCode" value={data.zipCode} type="text" placeholder='Zip code' required />
            <input onChange={onChangeHandlers} name="country" value={data.country} type="text" placeholder='Country' required/>
          </div>
          <input onChange={onChangeHandlers} name="phone" value={data.phone} type="text" placeholder='Phone' required />
          </div>
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
                <button type="submit">PROCEED TO PAYMENT</button>
        </div>
        </form>
       </div>
       
    </div>
  )
}

export default PlaceOrder

