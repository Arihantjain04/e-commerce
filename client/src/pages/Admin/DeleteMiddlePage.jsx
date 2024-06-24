import React, { useEffect, useState } from "react";
import ProductSmall from "../../components/ProductSmall";
import AdminProductSmall from "../../components/AdminProductSmall";
import AdminNavbar from "./AdminNavbar";

const DeleteMiddlePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-tkjz.onrender.com/api/product/getAllProducts",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API response data:", data); // Log the response to understand its structure

        // Set products directly from the response data
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className="admin-containers">
        <AdminNavbar />
        <div className="update-cards-container">
          {products.length > 0 ? (
            products.map(
              (product) =>
                product._id && (
                  <AdminProductSmall
                    key={product._id}
                    pid={product._id}
                    task={'deleteProduct'}
                    productName={product.productName}
                    salePrice={product.salePrice}
                    originalPrice={product.originalPrice}
                    imgSrc={product.image}
                  />
                )
            )
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteMiddlePage;
