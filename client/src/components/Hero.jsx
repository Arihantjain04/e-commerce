import React from 'react'
import Carousel from "../components/Carousel.jsx";
import { NavLink } from "react-router-dom";
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero-container'>
        <div className='category-container'>
            <NavLink className='category-links'>Woman's Fashion</NavLink>
            <NavLink className='category-links'>Men's Fashion</NavLink>
            <NavLink className='category-links'>Electronics</NavLink>
            <NavLink className='category-links'>Home & Lifestyle</NavLink>
            <NavLink className='category-links'>Medicine</NavLink>
            <NavLink className='category-links'>Baby's & Toys</NavLink>
            <NavLink className='category-links'>Groceries & Pets</NavLink>
            <NavLink className='category-links'>Health & Beauty</NavLink>
        </div>
        <div className='carousel-container'>
            <Carousel/>
        </div>
    </div>
  )
}

export default Hero