import React from "react";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Logout from "./pages/Logout.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import WishList from "./pages/WishList.jsx";
import Footer from "./components/Footer.jsx";
import CreateProduct from './pages/Admin/CreateProduct.jsx'
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/myaccount" element={<MyProfile/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/admin/createProduct" element={<CreateProduct />}/>
        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
