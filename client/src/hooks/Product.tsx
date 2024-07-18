import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "src/api/api";
import { Product, ProductFormParams } from "src/types/Product";

const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const getProducts = async () => {
        setLoading(true);
        try {
            const {data} = await api.get("/products");
            setProducts(data);
        } catch (err: any) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getProductById = async (productId: string) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/products/${productId}`);
            return data; // Return the fetched product data
        } catch (err: any) {
            toast.error(err);
            return null; // Handle error case
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product: ProductFormParams) => {
        setLoading(true);
        try {
            const response = await api.post("/products", product);
            setProducts((prevProducts) => [...prevProducts, response.data]);
            toast.success("Added product successfully")
        } catch (err:any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (product: Product) => {
        setLoading(true);
        try {
            await api.put(`/products/${product._id}`, product);
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p._id === product._id ? product : p))
            );
        } catch (err: any) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId: string) => {
        setLoading(true);
        try {
            await api.delete(`/products/${productId}`);
            setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
        } catch (err: any) {
            toast.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts()
    }, []);

    return { products, loading, getProductById ,addProduct, updateProduct, deleteProduct, getProducts };
};

export default useProduct;