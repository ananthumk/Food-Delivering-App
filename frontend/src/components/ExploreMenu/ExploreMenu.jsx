import React from 'react'
import { menu_list } from '../../assets/assets/frontend_assets/assets'
import './ExploreMenu.css'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id="explore-menu">
       <h1>Explore Our Menu</h1>
       <p className="explore-text">Get your favorite food delivered hot and fresh with just a few taps! Our app connects you to the best restaurants, offering quick delivery, easy payments, and real-time tracking. Order now and enjoy delicious meals anytime, anywhere!</p>
       <div className="explore-menu-list">
          {menu_list.map((items, index) => {
            return(
               <div onClick={() => setCategory(prev => prev === items.menu_name ? 'All': items.menu_name)} key={index} className="explore-menu-list-items">
                   <img src={items.menu_image} alt="" className={category === items.menu_name ? 'active': ''} />
                   <p>{items.menu_name}</p>
               </div>
            )
          })}
       </div>
       <hr />
    </div>
  )
}

export default ExploreMenu
