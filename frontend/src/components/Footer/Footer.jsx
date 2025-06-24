import React from 'react'
import {assets} from '../../assets/assets/frontend_assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className="footer-content">
        <div className="footer-container-left">
            <img src={assets.logo} alt="" />
            <p>Effective software development requires a balance of clean code, scalability, and security. Developers must follow best practices, such as modular design, version control, and continuous integration. With evolving technologies, staying updated with modern frameworks and tools is essential for building robust applications.</p>
            <div className="social-media-platform">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="footer-container-center">
                <h1>COMPANY</h1>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
        </div>
        <div className="footer-container-right">
            <h1>GET IN TOUCH</h1>
            <p>contactus@gmail.com</p>
            <p>+91 826 674 3445</p>
        </div>
      </div>
      <hr className='separator' /> 
      <p className="copyright">© 2025 Tomato App. All rights reserved. Unauthorized use or reproduction is prohibited.</p>
    </div>
  )
}


export default Footer
