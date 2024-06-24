import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import SubCartComponents from '../components/SubCartComponents';
import { useAuth } from '../security/Auth';
import BillDiv from './BillDiv';

const Cart = () => {
  const [items, setItems] = useState([]);
  const userid = localStorage.getItem("userid").toString();
  const {bill, setBill} = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-tkjz.onrender.com/api/product/cart/${userid}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API response data:", data.items);

        setItems(data.items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userid]);

  return (
    <div className="cart-section">
      <div className='section-cart'>
        <div className="sub-section-cart"><p>Product</p></div>
        <div className="sub-section-cart"><p>Price</p></div>
        <div className="sub-section-cart"><p>Quantity</p></div>
        <div className="sub-section-cart"><p>Subtotal</p></div>
      </div>
      {/* {localStorage.setItem('bill', 0)} */}
      {items.length > 0 ? (
        items.map((item) => (
          item.product && (
            <SubCartComponents 
              key={item._id} 
              pid={item.product} 
              product={item.product}
              quantity={item.quantity} 
            />
          )
        ))
      ) : (
        <p>No products in your cart</p>
      )}
      <BillDiv cart={items} />
    </div>
  );
}

export default Cart;
