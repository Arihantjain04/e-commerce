import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import {Toaster, toast} from 'react-hot-toast'
import AdminNavbar from "./AdminNavbar";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    categoryName: "",
    inStock: '',
    salePrice: '',
    originalPrice: '',
    description: "",
    typeOfProduct: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    console.log("File selected:", e.target.files[0]);
    setImage(e.target.files[0]);
    console.log("Image state:", image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product State:", product);
    const formData = new FormData();
    for (const key in product) {
      console.log(`Appending ${key}: ${product[key]}`);
      formData.append(key, product[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    console.log("FormData:", formData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/product/createProduct",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error in Product creating:", errorData);
      } else {
        const data = await response.json();
        toast.success('Product Created Successfully !!!');
        console.log("Product Created Successfully:", data);


        setProduct({ productName: "",
        brandName: "",
        categoryName: "",
        inStock: '',
        salePrice: '',
        originalPrice: '',
        description: "",
        typeOfProduct: "",})
      }
    } catch (error) {
      console.error("Error in Product creating ...:", error);
    }
  };

  return (
    <><Toaster
    position="bottom-left"
    reverseOrder={false}
  />
  <div className="admin-containers">
    <AdminNavbar/>
    <div className="create-product">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} className="create-product-form" encType="multipart/form-data">
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Brand Name:
          <input
            type="text"
            name="brandName"
            value={product.brandName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category Name:
          <input
            type="text"
            name="categoryName"
            value={product.categoryName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          In Stock:
          <input
            type="number"
            name="inStock"
            value={product.inStock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sale Price:
          <input
            type="number"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Original Price:
          <input
            type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></input>
        </label>
        <label>
          Type of Product:
          <input
            type="text"
            name="typeOfProduct"
            value={product.typeOfProduct}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </label>

        <button type="submit">Create Product</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default CreateProduct;
