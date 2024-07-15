import Category from "../models/Category";

class CategoryController {
    async getAllCategory(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json({
                message: "Get all categories successfully",
                categories
            })
        }catch (error) {
            res.status(400).json({
                message: "Error!!!"
            })
        }
    }
    async getCategoryById(req, res) {
        try {
            const categories = await Category.findById(req.params.id);
            if(!categories) res.status(404).json({message: "Category not found!"})
            res.status(200).json({
                message: "Get categories successfully",
                categories
            })
        }catch (error) {
            res.status(400).json({
                message: "Error!!!"
            })
        }
    }
    async CreatCategory(req, res) {
        try {
            const categories = await Category.create(req.body);
            return res.status(200).json({
                message: "Create categories successfully",
                categories
            })
        }catch (error) {
            return res.status(400).json({
                message: "Error!!!"
            })
        }
    }
    async EditCategory(req, res) {
        try {
            const categories = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!categories) res.status(404).json({message: "Category not found!"})
            res.status(200).json({
                message: "Update categories successfully",
                categories
            })
        }catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async DeleteCategory(req, res) {
        try {
            const categories = await Category.findByIdAndDelete(req.params.id);
            if(!categories) res.status(404).json({message: "Category not found!"})
            res.status(200).json({
                message: "Delete categories successfully",
                categories
            })
        }catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

export default CategoryController;