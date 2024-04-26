import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

// Get all users controller
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({});

        res.status(200).json({
            success: true,
            countTotal: users.length,
            message: "All users",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getting users",
            error: error.message,
        });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming userId is passed as a route parameter

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User found",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getting user",
            error: error.message,
        });
    }
};