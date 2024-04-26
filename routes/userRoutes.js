import express from "express";
import {
    getUserByIdController, getAllUsersController
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-user/:userId", isAdmin, requireSignIn, getUserByIdController);

router.get("/get-all-users", requireSignIn, getAllUsersController);

export default router;