import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from '../assets/Home img1.jpg';
import img2 from '../assets/Home img2.jpeg';
import img3 from '../assets/Home img3.jpg';
import '../styles/Home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
    <div className='home-container'>
      <div className='home-left'>
        <h2>Welcome</h2>
        <p>At <strong>Sun Roofings</strong>, we take pride in providing top-quality roofing solutions for homes and businesses. With years of experience, skilled craftsmanship, and high-quality materials, we ensure durability, safety, and long-lasting protection for your property.</p>
        <button onClick={() => navigate("/products")} className='home-btn'>Get Started</button>
      </div>
      <div className='home-right'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide><img src={img1} alt="Slide 1" /></SwiperSlide>
          <SwiperSlide><img src={img2} alt="Slide 2" /></SwiperSlide>
          <SwiperSlide><img src={img3} alt="Slide 3" /></SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div className="home-category">
        <p>Choose the category</p>
    </div>
    </div>
  );
};

export default Home;
