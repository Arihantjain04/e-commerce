import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
            required: true,
            default: "",
		},
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
                default: [],
            }
        ],
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cart",
                default: [],
            }
        ],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;