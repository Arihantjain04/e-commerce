import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductSmall from '../components/ProductSmall'
import './Category.css'

const Category = () => {
    const {category} = useParams()
    const [products, setProducts] = useState([])
    const [categoryH, setCategoryH] = useState('')


    useEffect(() => {
        if(category == 'electronics'){
            setCategoryH('Electronics')
        }
        else if(category == 'mensfashion'){
            setCategoryH('Men\'s Fashion')
        }
        else if(category == 'womansfashion'){
            setCategoryH('Woman\'s Fashion')
        }
        else if(category == 'homeandlifestyle'){
            setCategoryH('Home & Lifestyle')
        }
        else if(category == 'medicine'){
            setCategoryH('Medicine')
        }
        else if(category == 'babysanstoys'){
            setCategoryH('Baby\'s & Toys')
        }
        else if(category == 'groceriesandpets'){
            setCategoryH('Groceries & Pets')
        }
        else{
            setCategoryH('Health & Beauty')
        }
        const fetchSaleProducts = async () => {
          try {
            const response = await fetch(
            `https://e-commerce-tkjz.onrender.com/api/product/getProductc/${category}`,
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
    
    fetchSaleProducts()}, [category])
  return (
    <>
    <h1 className='category-headings'>{categoryH}</h1>
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

export default Category
