import React from 'react';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProduct from '../../components/AddProduct/AddProduct';
import ListProduct from '../../components/ListProduct/ListProduct';


const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
