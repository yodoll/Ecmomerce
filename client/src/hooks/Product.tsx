import { useEffect, useState} from "react";
import { toast } from "react-toastify";
import api from "src/api/api";
import { Product, ProductFormParams } from "src/types/Product";

type ApiError = {
    message: string;
};

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    const getProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data);
        } catch (error) {
            const err = (error as ApiError).message
            toast.error(err);
        } 
    };

    const getProductById = async (productId: string) => {
        try {
            const { data } = await api.get(`/products/${productId}`);
            return data; // Return the fetched product data
        } catch (error) {
            const errorMessage = (error as ApiError).message || "An error occurred while fetching the product.";
            toast.error(errorMessage);
        }
    };

    const addProduct = async (product: ProductFormParams) => {
        try {
            const response = await api.post("/products", product);
            setProducts((prevProducts) => [...prevProducts, response.data]);
        } catch (error) {
            const errorMessage = (error as ApiError).message || "An error occurred while adding the product.";
            toast.error(errorMessage);
        }
    };

    const updateProduct = async (product: Product) => {
        try {
            await api.put(`/products/${product._id}`, product);
            setProducts((prevProducts) => prevProducts.map((p) => (p._id === product._id ? product : p)));
        } catch (error) {
            const errorMessage = (error as ApiError).message || "An error occurred while updating the product.";
            toast.error(errorMessage);
        } 
    };

    const deleteProduct = async (productId: string) => {
        try {
            await api.delete(`/products/${productId}`);
            setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
        } catch (error) {
            const errorMessage = (error as ApiError).message || "An error occurred while deleting the product.";
            toast.error(errorMessage);
        } 
    };
    useEffect(() => {
        getProducts();
    }, [])

    return { products, getProductById, addProduct, updateProduct, deleteProduct, getProducts };
};

export default useProduct;
