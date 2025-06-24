import React from 'react'
import './Order.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/admin_assets/assets.js'

const Order = ({ url }) => {
  const [order, setOrder] = useState([])

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(url + "/api/order/getorders")
      if (response.data.success) {
        setOrder(response.data.data)
        console.log(response.data.data)
      }
    } catch (error) {
      toast.error('Error')
    }
  }

  const statushandler = async (event, orderId) => {
     const values = {orderId: orderId, status: event.target.value}
       try {
          const response = await axios.post(url + '/api/order/status', values)
          if(response.data.success) {
            await fetchOrderDetails()
          }
       } catch (error) {
         toast.error('Error')
       }    
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])



  return (
    <div className='order'>
      <h1>Order Page</h1>
      <div className="order-container">
        {order.map((order, index) => {
          return (
            <div className="order-list-container">
              <img src={assets.parcel_icon} alt="" />
              <div className="order-details">
                <p>{order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
                </p>
               <div className='customer-details'>
                  <p className='order-user-name'>{order.address.firstName} {order.address.lastName}</p>
                  <div className="order-address">
                    <p>{order.address.street}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                  </div>
                  <p className='order-user-phone'>{order.address.phone}</p>
               </div>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
             <select value={order.status} onChange={(event => statushandler(event, order._id))} className='order-status'>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default Order
