import React from 'react'
import tpSrc from '../assets/topproduct1.png'
import './TopProduct.css'

const TopProduct = () => {
  return (
    <div className='top-product-container'>
        <div className="leftD">
            <h4>Top Product</h4>
            <h1>Enhance Your Music Experience</h1>
            <button>Buy Now!</button>
        </div>
        <div className="rightD">
            <img src={tpSrc} alt="" />
        </div>
    </div>
  )
}

export default TopProduct