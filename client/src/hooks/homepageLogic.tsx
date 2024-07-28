// src/components/homepageLogic.ts

import { useState, useEffect } from "react";
import useProduct from "src/hooks/Product";
import { useLoading } from "src/context/Loading";

export const useHomepageLogic = () => {
  const { products } = useProduct();
  const { loading } = useLoading();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePageChange = (page: number) => setCurrentPage(page);

  return {
    products,
    loading,
    currentPage,
    viewAll,
    showScrollButton,
    totalPages,
    handleScrollToTop,
    handlePageChange,
    setViewAll,
  };
};
