import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const DeleteProduct = () => {
    const {id} = useParams()
    useEffect(() => {
        const deleteProduct = async () => {
        try {
            const response = await fetch(
              `https://e-commerce-tkjz.onrender.com/api/product/deleteProduct/${id}`,
              {
                method: "DELETE",
              }
            );
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            else{
                console.log('product deleted successfully !!!');
            }
          } catch (error) {
            console.error("Error deleting product:", error);
          }
        }

        deleteProduct()
    }, [id])
  return (
    <Navigate to='/admin/deleteProduct'/>
  )
}

export default DeleteProduct
