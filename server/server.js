import express from "express";
import { connectMongoDB } from "./db/connectMongoDB.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import {v2 as cloudinary} from 'cloudinary'


const app = express()
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:5173', // Removed trailing slash
    methods: 'GET, PUT, POST, DELETE, PATCH, HEAD',
    credentials: true,
    optionsSuccessStatus: 200 // Added to handle older browsers
};

app.use(cors(corsOptions));

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/product/', productRoutes);
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log("Server is running on port !!!")
    connectMongoDB()
}) 