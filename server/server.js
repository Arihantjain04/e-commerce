import express from "express";
import { connectMongoDB } from "./db/connectMongoDB.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

dotenv.config()

const corsOptions = {
    origin: 'http://localhost:5173', // Removed trailing slash
    methods: 'GET, PUT, POST, DELETE, PATCH, HEAD',
    credentials: true,
    optionsSuccessStatus: 200 // Added to handle older browsers
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log("Server is running on port !!!")
    connectMongoDB()
}) 