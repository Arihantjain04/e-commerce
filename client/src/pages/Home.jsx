import React, { useEffect, useState } from "react";
import ProductSmall from "../components/ProductSmall.jsx";
import "../styles/Home.css";
import Hero from "../components/Hero.jsx";
import SaleSection from "../components/Sale.jsx";
import PopularCategories from "../components/PopularCategories.jsx";
import TopProduct from "../components/TopProduct.jsx";
import { NavLink } from "react-router-dom";
import item1 from "../assets/item1.png";
import item2 from "../assets/item2.png";
import item3 from "../assets/item3.png";
import item4 from "../assets/item4.png";
import AllProducts from "../components/AllProducts.jsx";
import Featured from "../components/Featured.jsx";
import SubFooter from "../components/SubFooter.jsx";

const Home = () => {
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
    <div style={{ width: "100vw", padding: "5vh 5vw" }}>
      <Hero />
      <SaleSection />
      <PopularCategories />
      <TopProduct />
      <AllProducts products={products} />
      <Featured />
      <SubFooter/>
    </div>
  );
};

export default Home;
