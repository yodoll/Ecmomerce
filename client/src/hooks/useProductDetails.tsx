// src/hooks/useProductDetails.ts
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "src/context/Loading";
import useProduct from "src/hooks/Product";
import { Product } from "../types/Product";

const useProductDetails = () => {
  const { id } = useParams<string>();
  const { loading, setLoading } = useLoading();
  const { getProductById, getProductsByCategory } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      if (id) {
        try {
          const data = await getProductById(id);
          setProduct(data);
          const related = await getProductsByCategory(data.category._id);
          setRelatedProducts(
            related.filter((p: Product) => p._id !== data._id)
          );
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  return { loading, product, relatedProducts };
};

export default useProductDetails;
