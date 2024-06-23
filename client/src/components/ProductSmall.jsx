import React from 'react'
import "./ProductSmall.css";

const ProductSmall = (props) => {
  return (
    <div className='productSmallContainer'>
        <div className="imgDiv">
            <img src={`${props.imgSrc}`} alt="" />
        </div>
        <h4 className='productSmallName'>{props.productName}</h4>
        <div className="productSmallPrices">
            <p className="productSmallSprice">{`$${props.salePrice}`}</p>
            <p className="productSmallOprice">{`$${props.originalPrice}`}</p>
        </div>
    </div>
  )
}

export default ProductSmall