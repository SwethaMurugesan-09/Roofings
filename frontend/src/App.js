import React from "react";
import { BrowserRouter, Routes, Route, Router  } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Product from './Pages/Product'
function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Product/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
