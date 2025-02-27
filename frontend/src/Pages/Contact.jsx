import React from 'react'
import '../styles/Contact.css'
const Contact = () => {
  
  const address = "Erode to Karur Main Road, Kolathupalayam(Po), Aarapalayam-638152";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const openWhatsApp = () => {
    const phoneNumber = "6374386020"; 
    const message = encodeURIComponent("");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className='contact-container'>
        <h1>Contact us</h1>
        <p>Erode to Karur Main Road, Kolathupalayam(Po)</p>
        <p>Aarapalayam-638152</p>
        <p><strong>Email: </strong>sunroofingindustries@gmail.com</p>
        <div className='contact-btn-container'>
             <button  onClick={openWhatsApp} className='contact-button'>Contact via whatsapp</button>
             <button className='contact-button-number'>+91 6374386020</button>
        </div>
        <div className='contact-map'>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className='contact-map-btn'>View map</a>
        </div>
    </div>
  )
}

export default Contact