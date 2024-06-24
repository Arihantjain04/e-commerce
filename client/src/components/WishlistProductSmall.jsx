import React from "react";
import "./ProductSmall.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import '../styles/Home.css'
import { useAuth } from "../security/Auth";
import {Toaster, toast} from 'react-hot-toast'

const WishlistProductSmall = (props) => {
    const {userid} = useAuth()
    const navigate = useNavigate()
    const removeWish = async () => {
        try {
          const response = await fetch(
            `https://e-commerce-tkjz.onrender.com/api/product/removefromwishlist/${userid}/${props.pid}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          toast.success("Product removed from wishlist successfully !!!")
        } catch (error) {
          console.error("Error removing product from wishlist:", error);
        }
      };
  return (
    <><Toaster
    position="bottom-left"
    reverseOrder={false}
  />
    <div className="wishlist-products-container">
    <NavLink to={`/product/${props.pid}`} style={{ color: "black" }}>
      <div className="productSmallContainer">
        <div className="imgDiv">
          <img src={`${props.imgSrc}`} alt="" />
        </div>
        <h4 className="productSmallName">{props.productName}</h4>
        <div className="productSmallPrices">
          <p className="productSmallSprice">{`$${props.salePrice}`}</p>
          <p className="productSmallOprice">{`$${props.originalPrice}`}</p>
        </div>
      </div>
    </NavLink>
    <NavLink to='/wishlist/middle' className="remove-wishlist" onClick={removeWish} >Remove from Wishlist</NavLink>
    </div>
    </>
  );
};

export default WishlistProductSmall;
