import React, { use, useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';


const List = ({url}) => {
  
  
  const [list, setList] = useState([]);

  const fetchList = async() => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error(response.data.message)
    }
  }
  
  const removeFood = async(id) => {
    const response = await axios.post(`${url}/api/food/remove`, {id});
    if(response.data.success){
      toast.success(response.data.message)
      await fetchList()
    }
    else{
      toast.error(response.data.message)
    }
  }
     
  useEffect(() => {
    fetchList()
  },[])

  return (
    <div className='list'>
       <p>All food list</p>
       <div className="food-table flex-col">
        <div className="food-item-table title">
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item , index) => {
          return(
            <div key={index} className="food-item-table">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
       </div>
    </div>
  )
}

export default List