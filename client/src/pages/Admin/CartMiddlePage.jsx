import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../security/Auth';

const CartMiddlePage = () => {
  const { userid } = useAuth();
  const { pid } = useParams();
  const navigate = useNavigate();
  const hasAddedToCart = useRef(false); // Use ref to keep track

  useEffect(() => {
    const addtocart = async () => {
      if (hasAddedToCart.current) return; // If already called, do nothing

      try {
        const response = await fetch(
          `https://e-commerce-tkjz.onrender.com/api/product/addincart/${userid}/${pid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        hasAddedToCart.current = true; // Mark as called
        navigate('/cart');
      } catch (error) {
        console.error("Error adding product in cart:", error);
      }
    };

    addtocart();
  }, [navigate]); // Add navigate to dependencies

  return (
    <div>hello</div>
  );
};

export default CartMiddlePage;
