import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: {
    unique: true,
    type: String,
    // required: true
  },
  brandName: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  typeOfProduct: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  inStock: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    default: 'https://momooz.com/uploads/dummy.png',
  },
  salePrice: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  numberOfSales: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product
