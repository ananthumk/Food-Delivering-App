import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
   
    
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: ""
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onSubmitHandlers =  async(e) => {
        e.preventDefault();
        const newForm = new FormData()
        newForm.append('name', data.name)
        newForm.append('description', data.description)
        newForm.append('price', data.price)
        newForm.append('category', data.category)
        newForm.append('image', image)
        
        const response = await axios.post(`${url}/api/food/add`, newForm)

        if(response.data.success){
            setData({
                name: "",
                description: "", 
                category: "Salad",
                price: ""
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
    
  return (
    <div className='add'>
       <form onSubmit={onSubmitHandlers} action="" className="flex-col">
        <div className="add-image-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={ image? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0]) } type="file" id ="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={handleChange} value={data.name} name='name' type="text" placeholder="Type here" required />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={handleChange} value={data.description} name="description" rows="6" required></textarea>
        </div>
        <div className="categry-price">
            <div className="add-product-category flex-col">
                <p>Product category</p>
                <select onChange={handleChange} value={data.category} name="category">
                    <option value="Salad" checked>Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-product-price flex-col">
                <p>Product price</p>
                <input onChange={handleChange} value={data.price} name="price" type="number" placeholder='$10' required />
            </div>
        </div>
        <button  type="submit" className='add-btn'>ADD</button>
       </form>
    </div>
  )
}

export default Add
 