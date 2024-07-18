import { useEffect, useState } from 'react';
import api from 'src/api/api';
import { Category } from 'src/types/Product';

const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        setLoading(true);
        try {
            const {data} = await api.get('/categorys');
            setCategories(data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        loading,
        getCategories,
    };
};

export default useCategory;