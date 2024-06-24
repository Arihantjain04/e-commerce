import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";
import { Toaster, toast } from "react-hot-toast";
import AdminNavbar from "./AdminNavbar";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    brandName: "",
    categoryName: "",
    inStock: "",
    salePrice: "",
    originalPrice: "",
    description: "",
    typeOfProduct: "",
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-tkjz.onrender.com/api/product/getProduct/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

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
        `http://localhost:8000/api/product/updateProduct/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error in Product updating:", errorData);
      } else {
        const data = await response.json();
        toast.success('Product Updated Successfully !!!');
        console.log("Product Updated Successfully:", data);
      }
    } catch (error) {
      console.error("Error in Product updating ...:", error);
    }
  };

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="admin-containers">
    <AdminNavbar/>
      <div className="create-product">
        <h1>Update Product</h1>
        <form
          onSubmit={handleSubmit}
          className="create-product-form"
          encType="multipart/form-data"
        >
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
          </label>
          <label>
            Brand Name:
            <input
              type="text"
              name="brandName"
              value={product.brandName}
              onChange={handleChange}
            />
          </label>
          <label>
            Category Name:
            <input
              type="text"
              name="categoryName"
              value={product.categoryName}
              onChange={handleChange}
            />
          </label>
          <label>
            In Stock:
            <input
              type="number"
              name="inStock"
              value={product.inStock}
              onChange={handleChange}
            />
          </label>
          <label>
            Sale Price:
            <input
              type="number"
              name="salePrice"
              value={product.salePrice}
              onChange={handleChange}
            />
          </label>
          <label>
            Original Price:
            <input
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              name="description"
              value={product.description || ""}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Type of Product:
            <input
              type="text"
              name="typeOfProduct"
              value={product.typeOfProduct || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Image:
            <input type="file" name="image" onChange={handleFileChange} />
          </label>

          <button type="submit">Update Product</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default UpdateProduct;
