import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';
import { useAuth } from '../security/Auth';
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const SubCartComponents = ({ pid, quantity }) => {
  const [product, setProduct] = useState({});
  const [squantity, setSquantity] = useState(quantity);

  const { bill, setBill } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/product/getProduct/${pid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        localStorage.setItem('bill', Number(localStorage.getItem('bill')) + Number(data.salePrice * quantity))
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    const diff = newQuantity - quantity;
    setSquantity(newQuantity);
    setBill(prevBill => prevBill + (product.salePrice * diff));
    localStorage.setItem('bill', prevBill + (Number(product.salePrice) * Number(diff))); // Update the bill in local storage
  };
  

  return (
    <div className='section-cart'>
      <div className="sub-section-cart img-name">
        <div><img src={product.image} alt="" /></div>
        <p>{product.productName}</p>
      </div>
      <div className="sub-section-cart"><p>{`$${product.salePrice}`}</p></div>
      <div className="sub-section-cart">
        <input 
          className='quantity-input'
          type='number' 
          onChange={handleQuantityChange} 
          min={0} 
          value={squantity} 
        />
      </div>
      <div className="sub-section-cart">
        <p>{`$${(product.salePrice * squantity).toFixed(2)}`}</p>
      </div>
        <div>
        <NavLink to={`/removecart/${pid}`} ><MdDelete className='cart-delete-btn' /></NavLink>
        </div>
    </div>
  );
};

export default SubCartComponents;
