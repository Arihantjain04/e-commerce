import React, { useEffect, useRef } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../security/Auth';

const DeleteCartMiddlePage = () => {
    const { userid } = useAuth();
  const { pid } = useParams();
  const navigate = useNavigate();
  const hasAddedToCart = useRef(false); // Use ref to keep track

  useEffect(() => {
    const removefromcart = async () => {
      if (hasAddedToCart.current) return; // If already called, do nothing

      try {
        const response = await fetch(
          `http://localhost:8000/api/product/removefromcart/${userid}/${pid}`,
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
        hasAddedToCart.current = true; // Mark as called
        navigate('/cart');
      } catch (error) {
        console.error("Error adding product in cart:", error);
      }
    };

    removefromcart();
  }, [pid, userid, navigate]); // Add navigate to dependencies
  return (
    <div>hello</div>
  )
}

export default DeleteCartMiddlePage