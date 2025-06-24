import React, { useState } from 'react'
import { assets } from '../../assets/assets/frontend_assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setLoginPopUp}) => {

  const [menu, setMenu] = useState('home') 
  const { totalCartAmount, token, setToken} = useContext(StoreContext)
  const navigate = useNavigate()

  const logoutButton = () => {
   localStorage.removeItem('token')
   setToken('')
   navigate('/')
  }

  return (
    <div className='navbar'>
       <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
       
       <ul className="navbar-menu">
         <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
         <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''} >Menu</a>
         <a href="#app-download" onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''} >Mobile-app</a>
         <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''} >Contact us</a>
       </ul>
       <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
            <div className={totalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token? <button onClick={() => setLoginPopUp(true)}>Sign in</button> : 
          <div className='navbar-profile'>
             <img src={assets.profile_icon} /> 
             <div className="profile-sub">
                 <ul>
                  <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
                  <hr />
                  <li><img onClick={logoutButton} src={assets.logout_icon} alt="" />Logout</li>
                 </ul>
             </div>
          </div>}
        
       </div>
    </div>
  ) 
}

export default Navbar

