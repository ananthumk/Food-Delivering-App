import React , {useContext, useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css' 
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {
  
  const [serachParams, setSerachParams] = useSearchParams("")  
  const success = serachParams.get("success")
  const orderId = serachParams.get("orderId")

  const {url} = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyOrder = async () => {
    
    const response = await axios.post(`${url}/api/order/verify`, {orderId, success});
    if(response.data.success){
      navigate('/myorders')
    } else {
        navigate('/')
    }
  }

  useEffect(() => {
    verifyOrder()
  }, [])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}
  
export default Verify
