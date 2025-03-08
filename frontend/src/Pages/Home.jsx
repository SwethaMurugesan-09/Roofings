import React, { useEffect, useState } from 'react';
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
import nuvvucotto from '../assets/nuvocotto.jpg';
import pioneer from '../assets/pioneer.png';
import rockshield from '../assets/rockshield.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);
  
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  return (
    <div>
    <div className='home-container'>
      <div className='home-left'>
        <h2>Welcome</h2>
        <h3>Explore Our Best Products!</h3>
        <p className='home-container-para'>At <strong>Sun Roofings</strong>, we take pride in providing top-quality roofing solutions for homes and businesses. With years of experience, skilled craftsmanship, and high-quality materials, we ensure durability, safety, and long-lasting protection for your property.</p>
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
    <div className='home-partners'>
        <h3>Our Trusted Partners</h3>
        <div>
          <img src={nuvvucotto}/>
          <img src={pioneer}/>
          <img src={rockshield}/>
        </div>
    </div>
    <div className="home-category">
        <h2>Choose the category</h2>
        <div className='home-category-container'>
          {categories.map((category) => (
          <div key={category._id} className="home-category-item" onClick={() => handleCategoryClick(category._id)}>
                <div>
                    <img src={category.image} className="home-category-img" />
                </div>
                <div>
                  <p className="home-category-name">{category._id}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
    </div>
  );
};

export default Home;
