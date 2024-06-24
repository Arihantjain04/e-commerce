import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductSmall from '../components/ProductSmall'
import './Category.css'

const Type = () => {
    const {type} = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchSaleProducts = async () => {
          try {
            const response = await fetch(
            `https://e-commerce-tkjz.onrender.com/api/product/getProductt/${type}`,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }
            );
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            console.log(data);
            setProducts(data);
          } catch (error) {
            console.error("Error fetching sale products:", error);
          }
        }
    
    fetchSaleProducts()}, [type])
  return (
    <>
    <h1 className='category-headings' style={{textTransform: 'capitalize'}}>{type}</h1>
    <div className="category-containers">
          {products.map((product) => (
            <ProductSmall
              key={product._id}
              pid={product._id}
              productName={product.productName}
              salePrice={product.salePrice}
              originalPrice={product.originalPrice}
              imgSrc={product.image}
            />
          ))}
    </div>
    </>
  )
}

export default Type
