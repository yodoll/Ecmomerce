import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface CartContextType {
    cart: number
    setCart: React.Dispatch<React.SetStateAction<number>>;
}

// Khởi tạo context với kiểu dữ liệu hoặc giá trị mặc định
const CartContext = createContext<CartContextType | undefined>(undefined);

// Định nghĩa type cho các props của provider
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<number>(0);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook để sử dụng context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
