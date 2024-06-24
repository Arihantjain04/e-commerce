import Product from '../models/Product.models.js';
import User from '../models/user.models.js';
import Cart from '../models/Cart.models.js'

export const addProductToCart = async (req, res) => {
    try {
  
      const { userid, productId } = req.params;
  
      const user = await User.findById(userid);
      const product = await Product.findById(productId);
  
      if (!user || !product) {
        return res.status(404).json({ error: "User or Product not found" });
      }
  
      let cart = await Cart.findOne({ user: userid });
  
      if (!cart) {
        cart = new Cart({ user: userid, items: [{ product: productId, quantity: 1 }] });
      } else {
        const existingProductIndex = cart.items.findIndex(item => item.product && item.product.toString() === productId);        if (existingProductIndex !== -1) {
          cart.items[existingProductIndex].quantity += 1;
        } else {
          cart.items.push({ product: productId, quantity: 1 });
        }
      }
  
      await cart.save();
      res.status(200).json({ message: "Product added to Cart", cart });
    } catch (error) {
      console.error("Error in addProductToWishlist controller:", error.message);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  };
  
  export const removeProductFromCart = async (req, res) => {
    try {
      const { userid, productId } = req.params;
  
      let cart = await Cart.findOne({ user: userid });
  
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1); 
    }
  
      await cart.save();
      res.status(200).json({ message: "Product removed from Cart", cart });
    } catch (error) {
      console.error("Error in removeProductFromCart controller:", error.message);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  };
  
  export const getCart = async (req, res) => {
    try {
      const { userid } = req.params;
  
      let cart = await Cart.findOne({ user: userid }).populate('items');
  
      if (!cart) {
        return res.status(404).json({});
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error in getCart controller:", error.message);
      res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  };
  