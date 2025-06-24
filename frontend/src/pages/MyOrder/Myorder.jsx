import React, { useContext, useEffect, useState } from 'react'
import './Myorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets/frontend_assets/assets'
import './MyOrder.css'

const Myorder = () => {

  const [data, setData] = useState([])

  const { token, url } = useContext(StoreContext)

  const getmyOrders = async () => {
    const response = await axios.post(`${url}/api/order/fetchorder`, {}, { headers: { token } })
    if (response.data.success) {
      setData(response.data.orders)
      console.log(response.data.orders)
    }
  }

  useEffect(() => {
    if (token) {
      getmyOrders()
    }
  }, [token])


  return (
    <div className='myorder'>
      <h2>My Orders</h2>
      {data.length === 0 ? <h1>No Orders</h1> :
        <div>
          {data.map((order, index) => {
            return (
              <div className='myorder-card' key={index}>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item, index) => {
                  if(index === order.items.length - 1){
                    return item.name+" x "+item.quantity
                  }else{ 
                    return item.name+" x "+item.quantity+", "

                  }
                })}</p>
                
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={getmyOrders}>Track Order</button>
              </div>
            )
          })}
        </div>}
    </div>
  )
}

export default Myorder
