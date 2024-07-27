import { useState } from "react";
import api from "src/api/api";
import { Product } from "src/types/Product";
type CartItem = {
    productId: string;
    quantity: number;
};

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async (product: Product, quantity: number) => {
        if (quantity <= 0) return;
        try {
            // Gửi yêu cầu đến server để lưu giỏ hàng vào cơ sở dữ liệu
            const {data} = await api.post("/cart", {product, quantity})
            setCart(data);
            console.log('Cart updated successfully:', data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    return {
        cart,
        addToCart,
    };
};