import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controllers.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router()

router.post('/createProduct', singleUpload, createProduct)
router.get('/getProduct/:id', getProduct)
router.get('/getAllProducts', getAllProducts)
router.delete('/deleteProduct/:id', protectRoute, deleteProduct)
router.put('/updateProduct/:id', singleUpload, updateProduct)

export default router