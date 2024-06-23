import React, { useState, useEffect } from "react";
import ProductSmall from "../components/ProductSmall.jsx";
import "./Sale.css";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

const SaleSection = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endTime, setEndTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/product/getAllProducts",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      }
    };

    const storedEndTime = localStorage.getItem("flashSaleEndTime");
    if (storedEndTime) {
      setEndTime(new Date(storedEndTime));
    } else {
      const today = new Date();
      today.setHours(24, 0, 0, 0); // Set end time to 12:00 AM tomorrow
      setEndTime(today);
      localStorage.setItem("flashSaleEndTime", today);
    }

    fetchSaleProducts();

    const updateTimer = () => {
      const timeRemaining = new Date(localStorage.getItem("flashSaleEndTime")) - new Date();
      if (timeRemaining > 0) {
        setCurrentTime(formatTime(timeRemaining));
      } else {
        const today = new Date();
      today.setHours(24, 0, 0, 0); // Set end time to 12:00 AM tomorrow
      setEndTime(today);
      localStorage.setItem("flashSaleEndTime", today);
      }
    };

    const intervalId = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < products.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const visibleCards = products.slice(currentIndex, currentIndex + 5);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="sale-section">
      <div className="todays-div">
        <div className="todays-border"></div>
        <h4 className="todays">Today's</h4>
      </div>
      <div className="sale-heading">
        <h2>Flash Sales</h2>
        <div className="timer">Time Remaining: {currentTime}</div>
      </div>
      <div className="products-container-arrow">
        <div className="products-container">
          {visibleCards.map((product) => (
            <ProductSmall
              key={product._id}
              productName={product.productName}
              salePrice={(product.salePrice * 0.8).toFixed(2)}
              originalPrice={product.originalPrice}
              imgSrc={product.image}
            />
          ))}
        </div>
        <div className="sale-btns-div">
          <button className="arrow-button left" onClick={handleLeftClick}>
            <CiCircleChevLeft />
          </button>
          <button className="arrow-button right" onClick={handleRightClick}>
            <CiCircleChevRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleSection;
