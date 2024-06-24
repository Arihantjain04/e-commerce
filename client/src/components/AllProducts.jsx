import React from 'react'
import ProductSmall from './ProductSmall'

const AllProducts = (props) => {
  return (
    <>
        <div className="todays-div">
        <div className="todays-border"></div>
        <h4 className="todays">All Products</h4>
      </div>
      <div className="sale-heading">
        <h2>Explore All Our Products</h2>
      </div>
      <div className="cards-container">
        {props.products.length > 0 ? (
          props.products.map((product) => (
            product._id&&<ProductSmall
              key={product._id}
              pid={product._id}
              productName={product.productName}
              salePrice={product.salePrice}
              originalPrice={product.originalPrice}
              imgSrc={product.image}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  )
}

export default AllProducts