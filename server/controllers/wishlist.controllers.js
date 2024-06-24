import Wishlist from '../models/Wishlist.models.js';
import Product from '../models/Product.models.js';
import User from '../models/user.models.js';

export const addProductToWishlist = async (req, res) => {
  try {

    const { userid, productId } = req.params;

    const user = await User.findById(userid);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ error: "User or Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userid });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userid, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      } else {
        return res.status(400).json({ error: "Product already in wishlist" });
      }
    }

    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error("Error in addProductToWishlist controller:", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

export const removeProductFromWishlist = async (req, res) => {
  try {
    const { userid, productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: userid });

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    console.error("Error in removeProductFromWishlist controller:", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { userid } = req.params;

    let wishlist = await Wishlist.findOne({ user: userid }).populate('products');

    if (!wishlist) {
      return res.status(404).json({});
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Error in getWishlist controller:", error.message);
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};
