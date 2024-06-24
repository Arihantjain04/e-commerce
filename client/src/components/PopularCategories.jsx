import React from "react";
import { NavLink } from "react-router-dom";
import { CiMobile1 } from "react-icons/ci";
import { PiLaptopLight } from "react-icons/pi";
import { IoWatchOutline } from "react-icons/io5";
import { AiOutlineCamera } from "react-icons/ai";
import { IoShirtOutline } from "react-icons/io5";
import { LiaHeadphonesSolid } from "react-icons/lia";

import "./PopularCategories.css";

const PopularCategories = () => {
  return (
    <div className="popular-category-section">
      <div className="todays-div">
        <div className="todays-border"></div>
        <h4 className="todays">Popular Categories</h4>
      </div>
      <div className="sale-heading">
        <h2>Browse By Popular Categories</h2>
      </div>
      <div className="categories-container">
        <NavLink to='/typeofproduct/phones' className="categories-boxes">
          <CiMobile1 className="icons" />
          <span>Phones</span>
        </NavLink>
        <NavLink to='/typeofproduct/laptops' className="categories-boxes">
          <PiLaptopLight className="icons" />
          <span>Laptops</span>
        </NavLink>
        <NavLink to='/typeofproduct/watches' className="categories-boxes">
          <IoWatchOutline className="icons" />
          <span>Watches</span>
        </NavLink>
        <NavLink to='/typeofproduct/camera' className="categories-boxes">
          <AiOutlineCamera className="icons" />
          <span>Camera</span>
        </NavLink>
        <NavLink to='/typeofproduct/clothes' className="categories-boxes">
          <IoShirtOutline className="icons" />
          <span>Clothes</span>
        </NavLink>
        <NavLink to='/typeofproduct/headphones' className="categories-boxes">
          <LiaHeadphonesSolid className="icons" />
          <span>Headphones</span>
        </NavLink>
      </div>
    </div>
  );
};

export default PopularCategories;
