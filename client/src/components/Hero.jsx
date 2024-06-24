import React from 'react'
import Carousel from "../components/Carousel.jsx";
import { NavLink } from "react-router-dom";
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero-container'>
        <div className='category-container'>
            <NavLink to={`/category/${'womansfashion'}`} className='category-links'>Woman's Fashion</NavLink>
            <NavLink to={`/category/${'mensfashion'}`} className='category-links'>Men's Fashion</NavLink>
            <NavLink to={`/category/${'electronics'}`} className='category-links'>Electronics</NavLink>
            <NavLink to={`/category/${'homeandlifestyle'}`} className='category-links'>Home & Lifestyle</NavLink>
            <NavLink to={`/category/${'medicine'}`} className='category-links'>Medicine</NavLink>
            <NavLink to={`/category/${'babysandtoys'}`} className='category-links'>Baby's & Toys</NavLink>
            <NavLink to={`/category/${'groceriesandpets'}`} className='category-links'>Groceries & Pets</NavLink>
            <NavLink to={`/category/${'healthandbeauty'}`} className='category-links'>Health & Beauty</NavLink>
        </div>
        <div className='carousel-container'>
            <Carousel/>
        </div>
    </div>
  )
}

export default Hero