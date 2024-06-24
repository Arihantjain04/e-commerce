import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { BsCart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import {RiLogoutBoxLine} from 'react-icons/ri'
import "./Navbar.css";

import { useAuth } from "../security/Auth.jsx";

const Navbar = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  const [showOptions, setShowOptions] = useState(false);
  const toggleCart = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    // Reset showOptions when login status changes
    if (!isLoggedIn) {
      setShowOptions(false);
    }
  }, [isLoggedIn]);

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "navLinksLi navLinksLiActive" : "navLinksLi";

  return (
    <>
      <nav>
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>

        <ul className="navLinks">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLinkClass} to="/contact">
            Contact
          </NavLink>
          <NavLink className={getNavLinkClass} to="/about">
            About
          </NavLink>
          {isLoggedIn && isAdmin &&
            <NavLink className="navLinksLi" to="/admin">
            Admin
          </NavLink>
          }
          {!isLoggedIn && (
            <>
              <NavLink className="navLinksLi" to="/login">
                Login
              </NavLink>
              <NavLink className="navLinksLi" to="/signup">
                Signup
              </NavLink>
            </>
          )}
        </ul>

        <div className="navUtils">
          <div className="search">
            <input
              className="searchinput"
              type="text"
              placeholder="what are you looking for?"
            />
            <FiSearch className="searchicon" />
          </div>
          {isLoggedIn && (
            <>
              <NavLink to="/wishlist" className="cartdiv" id="cartdiv">
                <FiHeart className="carticon" />
              </NavLink>
              <NavLink to="/cart" className="cartdiv" id="cartdiv">
                <BsCart className="carticon" />
              </NavLink>

              <div className="cartdiv">
                <FiUser className="carticon" onClick={toggleCart} />
                {showOptions && (
                  <>
                    <div className="cartoptions" id="cartoptions">
                      <NavLink to="/myaccount" className="cartlinks">
                        MyProfile <VscAccount />
                      </NavLink>
                      <NavLink to="/logout" className="cartlinks">
                        Logout <RiLogoutBoxLine />
                      </NavLink>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
