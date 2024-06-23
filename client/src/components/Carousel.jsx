import React, { useState } from 'react';
import './Carousel.css';
import img1 from '../assets/carouselimg1.png'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  `${img1}`, // Replace with your image 1 URL
  `${img1}`, // Replace with your image 2 URL
  `${img1}`, // Replace with your image 3 URL
]

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} className="carousel-image" src={image} alt={`Slide ${index + 1}`} />
        ))}
      </div>
      <button className="carousel-button carousel-button--prev" onClick={handlePrev}>
        <FaChevronLeft style={{fontSize: '1rem'}}/>
      </button>
      <button className="carousel-button carousel-button--next" onClick={handleNext}>
      <FaChevronRight style={{fontSize: '1rem'}}/>
      </button>
    </div>
  );
};

export default Carousel;
