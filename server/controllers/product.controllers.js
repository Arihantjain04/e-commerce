import Product from "../models/Product.models.js";
import { v2 as cloudinary } from "cloudinary";
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      categoryName,
      inStock,
      salePrice,
      originalPrice,
      description,
      typeOfProduct,
    } = req.body;
    let image = req.file;

    if (
      !productName ||
      !brandName ||
      !categoryName ||
      !inStock ||
      !salePrice ||
      !originalPrice ||
      !typeOfProduct ||
      !description
    ) {
      return res
        .status(400)
        .json({ error: "Product must have all the details !!!" });
    }
    console.log(image);

    if (!image) {
      return res.status(400).json({ error: "Image file is required !!!" });
    }

    const uploadResponse = await cloudinary.uploader.upload(image.path);
    image = uploadResponse.secure_url;
    console.log(image);
    const isUnique = await Product.findOne({ productName });
    if (isUnique) {
      return res.status(400).json({ error: "Product already exists !!!" });
    }

    const newProduct = new Product({
      productName,
      brandName,
      categoryName,
      inStock,
      salePrice,
      image,
      originalPrice,
      description,
      typeOfProduct
    });
    await newProduct.save();
    console.log("Product created successfully !!!");
    res.status(200).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ error: "Product not found !!!" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ error: "Product not found !!!" });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully !!!" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      categoryName,
      inStock,
      salePrice,
      originalPrice,
      description,
      typeOfProduct
    } = req.body;
    let image = req.file;

    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found !!!" });
    }

    if (image) {
      if (product.image) {
        await cloudinary.uploader.destroy(
          product.image.split("/").pop().split(".")[0]
        );
      }

      const uploadResponse = await cloudinary.uploader.upload(image.path);
      image = uploadResponse.secure_url;

      console.log(image);
    }

    const updatedFields = {
      brandName: brandName || product.brandName,
      productName: productName || product.productName,
      categoryName: categoryName || product.categoryName,
      inStock: inStock || product.inStock,
      salePrice: salePrice || product.salePrice,
      originalPrice: originalPrice || product.originalPrice,
      description: description || product.description,
      typeOfProduct: typeOfProduct || product.typeOfProduct,
      image: image || product.image
    };

    await Product.findByIdAndUpdate(id, updatedFields);
    console.log('updatedFields: ', updatedFields);
    console.log("product updated successfully !!!");
    res.status(200).json(updatedFields);
  } catch (error) {
    console.log("Error in updateProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Find all products in the collection
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getAllProducts controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProductsByCategory = async (req, res) => {
  try {
    const {category} = req.params
    const products = await Product.find({categoryName: category}); // Find all products in the collection
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getAllProductsByCategory controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProductsByType = async (req, res) => {
  try {
    const {type} = req.params
    const products = await Product.find({typeOfProduct: type}); // Find all products in the collection
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getAllProducts controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
