import React, { useEffect, useState } from 'react'
import { useAuth } from '../security/Auth';
import ProductSmall from '../components/ProductSmall';
import '../styles/Home.css'
import WishlistProductSmall from '../components/WishlistProductSmall';
import '../styles/Home.css'

const WishList = () => {
  const [products, setProducts] = useState([]);
  const userid = localStorage.getItem("userid").toString()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-tkjz.onrender.com/api/product/wishlist/${userid}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API response data:", data); 

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
    <div className="wishlist-section">
      <div className="sale-heading">
        <h2>My Wishlist</h2>
      </div>
      <div className="wishlist-container-arrow">
        <div className="wishlist-products-container">
        {products.length > 0 ? (
            products.map(
              (product) =>
                product._id && (
                  <WishlistProductSmall
                    key={product._id}
                    pid={product._id}
                    task={'updateProduct'}
                    productName={product.productName}
                    salePrice={product.salePrice}
                    originalPrice={product.originalPrice}
                    imgSrc={product.image}
                  />
                )
            )
          ) : (
            <p>No products in your wishlist</p>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default WishList
