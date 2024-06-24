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
import SingleProduct from "./pages/SingleProduct.jsx";
import Category from "./pages/Category.jsx";
import Type from "./pages/Type.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import UpdateMiddlePage from "./pages/Admin/UpdateMiddlePage.jsx";
import DeleteMiddlePage from "./pages/Admin/DeleteMiddlePage.jsx";
import DeleteProduct from "./pages/Admin/DeleteProduct.jsx";
import WishlistMiddlePage from "./pages/WishlistMiddlePage.jsx";
import CartMiddlePage from "./pages/Admin/CartMiddlePage.jsx";
import DeleteCartMiddlePage from "./pages/Admin/DeleteCartMiddlePage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/cart/:pid" element={<CartMiddlePage/>}/>
        <Route path="/removecart/:pid" element={<DeleteCartMiddlePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/myaccount" element={<MyProfile/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/wishlist/middle" element={<WishlistMiddlePage/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/admin/createProduct" element={<CreateProduct />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />}/>
        <Route path="/admin/updateProduct" element={<UpdateMiddlePage />}/>
        <Route path="/admin/deleteProduct" element={<DeleteMiddlePage />}/>
        <Route path="/admin/deleteProduct/:id" element={<DeleteProduct/>}/>
        <Route path="/product/:id" element={<SingleProduct />}/>
        <Route path="/category/:category" element={<Category/>}/>
        <Route path="/typeofproduct/:type" element={<Type/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
