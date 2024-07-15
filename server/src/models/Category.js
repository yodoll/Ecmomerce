
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true},
    product: {type: String}
}, {
    versionKey: false,
    timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;