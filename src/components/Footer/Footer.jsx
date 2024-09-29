import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>this is place vit student will land before the exam</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Notes</li>
                    <li>Contact us</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOuch</h2>
                <ul>
                    <li>+91 9550799399</li>
                    <li>vitpapers@gmail.com</li>
                </ul>
            </div>
        </div>  
        <hr />
        <p className="footer-copyright">Copyright 2024 @ vitPaper.com -All Right-Reserved.</p>
    </div>
  )
}

export default Footer
