import React from 'react'
import '../styles/Contact.css'
const Contact = () => {
  return (
    <div className='contact-container'>
        <h1>Contact us</h1>
        <p>Erode to Karur Main Road, Kolathupalayam(Po)</p>
        <p>Aarapalayam-638152</p>
        <p><strong>Email: </strong>sunroofingindustries@gmail.com</p>
        <div className='contact-btn-container'>
             <button className='contact-button'>Contact via whatsapp</button>
             <button className='contact-button-number'>+91 6374386020</button>
        </div>
        <div className='contact-map'>
          <button className='contact-map-btn'>View Map</button>
        </div>
    </div>
  )
}

export default Contact