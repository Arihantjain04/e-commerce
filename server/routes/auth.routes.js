import express from "express";
import User from "../models/user.models.js";
import { getMe, login, logout, signup, updateMe } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.get('/me', protectRoute, getMe)
router.post('/me/update', protectRoute, updateMe)

export default router