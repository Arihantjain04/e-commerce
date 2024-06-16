import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    try {
        const {username, fullName, email, password} = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({error: "Invalid Email Format !!!", email})
        }

        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({error: "Username Taken !!!"})
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({error: "Email already exists !!!"})
        }

        if(password.length < 8){
            return res.status(400).json({error: "Password should be atleast 8 letters long !!!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            fullName,
            password: hashedPassword,
            email
        })

        if(newUser){
            const token = generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                orders: newUser.orders,
                cart: newUser.cart,
                token,
            })
        }
        else{
            res.status(200).json({error: "Invalid user data !!!"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body

        const user = await User.findOne({username})

        if(!user || !password){
            return res.status(404).json({error: "Invalid User or Password !!!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (isPasswordCorrect) {
            const token = generateTokenAndSetCookie(user._id, res);
      
            res.status(200).json({
              _id: user._id,
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              cart: user.cart,
              orders: user.orders,
              token,
            });
          }
      
          else{
              res.status(400).json({
                  error: "Invalid Password !!!"
              })
          }
    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: '0'})
        res.status(200).json({ message: "Log out successfully !!!" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
}