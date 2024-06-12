import React from 'react';

import Login from './component/login';
import ProductList from './component/productlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './component/cards';
import Register from './component/register'
import ProductForm from './component/addproduct';
import ProductFormUpdate from './component/updateProduct';
import ProductOrder from './component/productorder';
import OrderCreatePage from './component/create_order';
import Payment from './component/payment';
import Success from './component/success_payment';


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/cart/:orderId" element={<Cart />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/update-product/:id" element={<ProductFormUpdate />} />
        <Route path="/product-order/:orderId" element={<ProductOrder />} />
        <Route path="/order-create" element={<OrderCreatePage />} />
        <Route path="/payment/:orderId" element={<Payment />} />
        <Route path="/success" element={<Success />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
