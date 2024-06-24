import React from 'react'
import "./ProductSmall.css";
import { NavLink } from 'react-router-dom';

const AdminProductSmall = (props) => {
  return (
    <NavLink to={`/admin/${props.task}/${props.pid}`} style={{color: 'black'}}><div className='productSmallContainer'>
    <div className="imgDiv">
        <img src={`${props.imgSrc}`} alt="" />
    </div>
    <h4 className='productSmallName'>{props.productName}</h4>
    <div className="productSmallPrices">
        <p className="productSmallSprice">{`$${props.salePrice}`}</p>
        <p className="productSmallOprice">{`$${props.originalPrice}`}</p>
    </div>
</div></NavLink>
    
  )
}

export default AdminProductSmall