import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaStar as CiStar } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { TiArrowSync } from "react-icons/ti";
import { useAuth } from "../security/Auth";
import {Toaster, toast} from 'react-hot-toast'

const SingleProduct = () => {
  const { id } = useParams();
  const {userid} = useAuth()
  const [quantity, setQuantity] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    categoryName: "",
    inStock: "",
    salePrice: "",
    originalPrice: "",
    description: "",
    typeOfProduct: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-tkjz.onrender.com/api/product/getProduct/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addtowishlist = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-tkjz.onrender.com/api/product/addinwishlist/${userid}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast.error("Product already in the wishlist !!!")
        throw new Error("Network response was not ok");
      }
      setIsClicked(true);
      toast.success('Product added to the Wishlist !!!',
        {
          duration: 6000,
        }
      );
    } catch (error) {
      console.error("Error adding product in wishlist:", error);
    }
  }
  return (
    <><Toaster
    position="bottom-left"
    reverseOrder={false}
  />
      <div className="single-product-container">
        <div className="single-product-images">
            <div className="itemImg1"><img src={product.image} alt="" /></div>
            <div className="itemImg2"><img src={product.image} alt="" /></div>
            <div className="itemImg3"><img src={product.image} alt="" /></div>
            <div className="itemImg4"><img src={product.image} alt="" /></div>
            <div className="itemImg5"><img src={product.image} alt="" /></div> 
        </div>
        <div className="single-product-details">
          <h3>{product.productName}</h3>
          <div className="rating">
            <CiStar className="star" />
            <CiStar className="star" />
            <CiStar className="star" />
            <CiStar className="star" />
            <CiStar className="star" />
            <p>(150 Reviews) |</p>
            <span>in Stock</span>
          </div>
          <div className="single-prices">
            <p className="single-sale">{`$${product.salePrice}`}</p>
            <p className="single-original">{`$${product.originalPrice}`}</p>
          </div>
          <p className="single-description">{product.description}</p>
          <p className="colors">
            Colours <span className="red">Red</span>
            <input type="radio"></input>
            <span className="blue">Blue</span>
            <input type="radio" id="red"></input>
          </p>
          <p className="sizes">
            Size <button>XS</button> <button>S</button> <button>M</button>{" "}
            <button>L</button> <button>XL</button>
          </p>
          <div className="single-buy">
            <div className="quantity-container">
              <button
                className="quantity-button decrease"
                onClick={handleDecrease}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button
                className="quantity-button increase"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <NavLink className="buy-btn">Buy Now</NavLink>
            <button className="single-wishlist" style={{
                color: isClicked ? "white" : "black",
                backgroundColor: isClicked ? "#db4444" : "#b2b2b2", cursor: 'pointer', border: 'none',borderRadius: '5px'
              }} onClick={addtowishlist}>
              <IoMdHeartEmpty />
            </button>
          </div>
          <div className="delivery-info">
            <div className="delivery-info-sub first">
            <TbTruckDelivery className="dicon" />
              <div className="delivery-text">
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="delivery-info-sub second">
            <TiArrowSync className="dicon" />
              <div className="delivery-text">
                <h4>Return Delivery</h4>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p>get product of same type</p>
    </>
  );
};

export default SingleProduct;
