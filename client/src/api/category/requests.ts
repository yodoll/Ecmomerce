import { Category } from "src/types/Product";
import api from "../api";

export const getAllCategories = async (): Promise<Category[]> => {
    const { data } = await api.get("/categorys");
    return data.categories;
};
