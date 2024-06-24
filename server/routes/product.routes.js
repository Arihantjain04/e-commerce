import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsByCategory,
  getAllProductsByType,
  getProduct,
  updateProduct,
} from "../controllers/product.controllers.js";
import singleUpload from "../middlewares/multer.js";
import {
  addProductToWishlist,
  getWishlist,
  removeProductFromWishlist,
} from "../controllers/wishlist.controllers.js";
import { addProductToCart, getCart, removeProductFromCart } from "../controllers/cart.controllers.js";

const router = express.Router();

router.post("/createProduct", singleUpload, createProduct);
router.get("/getProduct/:id", getProduct);
router.get("/getProductc/:category", getAllProductsByCategory);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductt/:type", getAllProductsByType);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", singleUpload, updateProduct);

router.post("/addinwishlist/:userid/:productId", addProductToWishlist);
router.delete(
  "/removefromwishlist/:userid/:productId",
  removeProductFromWishlist
);
router.get("/wishlist/:userid", getWishlist);

router.post("/addincart/:userid/:productId", addProductToCart);
router.delete("/removefromcart/:userid/:productId", removeProductFromCart);
router.get("/cart/:userid", getCart);

export default router;
