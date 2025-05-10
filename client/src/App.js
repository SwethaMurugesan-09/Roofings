import React from "react";
import { BrowserRouter, Routes, Route, Router  } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Product from './Pages/Product'
import ProductDetials from "./Pages/ProductDetials";
import Contact from "./Pages/Contact";
import Toppicks from "./Pages/Toppicks";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import Login from "./Pages/Login";
function App() {
  return (
    <div>
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/products/:id" element={<ProductDetials/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/favourites" element={<Toppicks/>}/>
          <Route path="/login" element={<Login />}/>
      </Routes>
                      <ToastContainer />

      <Footer/>
    </>
    </div>
  );
}

export default App;
