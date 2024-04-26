import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const CreateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is Required' });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Category Already Exists'
            });
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).json({
            success: true,
            message: 'New category created',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error in Category'
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error in Category'
        });
    }
};

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).json({
            success: true,
            message: "All categories List",
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error while getting all categories'
        });
    }
};
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Get single Category successfully',
            category
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error while getting single category'
        });
    }
};
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category Deleted successfully'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error while getting deleting category'
        });
    }
}