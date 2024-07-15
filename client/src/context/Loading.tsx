import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

// Khởi tạo context với kiểu dữ liệu hoặc giá trị mặc định
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Định nghĩa type cho các props của provider
interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook để sử dụng context
export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};
