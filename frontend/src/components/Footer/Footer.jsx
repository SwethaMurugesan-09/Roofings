import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-main'>
    <div className='footer-container'>
        <div className='footer-start'>
            <h1>Sun Roofings</h1>
            <p>We offer reliable roofing solutions for homes, buildings, and various other structures, ensuring durability and quality.</p>
        </div>
        <div className='footer-center'>
            <h1>Resources</h1>
            <div>Products</div>
            <div>Top Picks</div>
            <div>Contacts</div>
        </div>
        <div className='footer-end'>
            <h1>Legal</h1>
            <div>Terms of services</div>
            <div>Privacy Policy</div>
        </div>
    </div>
    <h4>@2025Sun Roofing Pvt. All rights reserved.</h4>
    </div>
  )
}

export default Footer