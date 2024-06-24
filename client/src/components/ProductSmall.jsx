import React from 'react'
import "./ProductSmall.css";
import { NavLink, useParams } from 'react-router-dom';

const ProductSmall = (props) => {
  return (
    <NavLink to={`/product/${props.pid}`} style={{color: 'black'}}><div className='productSmallContainer'>
    <div className="imgDiv">
        <img src={`${props.imgSrc}`} alt="" />
        <NavLink to={`/cart/${props.pid}`} className="addtocartbtn">Add to Cart</NavLink>
    </div>
    <h4 className='productSmallName'>{props.productName}</h4>
    <div className="productSmallPrices">
        <p className="productSmallSprice">{`$${props.salePrice}`}</p>
        <p className="productSmallOprice">{`$${props.originalPrice}`}</p>
    </div>
</div></NavLink>
    
  )
}

export default ProductSmall