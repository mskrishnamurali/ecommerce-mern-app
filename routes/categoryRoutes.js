import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { CreateCategoryController, categoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//routes

router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController)

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

router.get('/get-category', categoryController)

router.get('/single-category/:id', singleCategoryController)

router.delete('/delete-category/:id', deleteCategoryController)

export default router;
