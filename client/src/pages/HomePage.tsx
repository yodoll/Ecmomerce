import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewAll, setViewAll] = useState<boolean>(false); // State to manage view all products
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:3000/products`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? "contained" : "outlined"}
          onClick={() => handlePageChange(i)}
          style={{ margin: "5px" }}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  const handleViewAllProducts = () => {
    setViewAll(true); // Set viewAll to true to show all products
  };

  const handleCloseViewAll = () => {
    setViewAll(false); // Set viewAll to false to hide all products
    setCurrentPage(1); // Reset current page to 1
  };

  const indexOfLastProduct = viewAll
    ? products.length
    : currentPage * productsPerPage;
  const indexOfFirstProduct = viewAll
    ? 0
    : indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Header />
      <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <LinearProgress style={{ width: "100%", marginTop: "10px" }} />
            </Grid>
          ) : (
            currentProducts.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  style={{
                    // maxWidth: 300,
                    margin: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{ height: 200, objectFit: "cover" }}
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: "16px"}}>
                      Price: ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{justifyContent: "space-between"}}>
                    <Button size="small" color="primary">
                      Add to cart
                    </Button>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" color="primary">
                        View Detail
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}

          <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
            {!viewAll ? (
              <Button
                variant="contained"
                onClick={handleViewAllProducts}
                style={{ margin: "5px" }}
              >
                View All Products
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleCloseViewAll}
                style={{ margin: "5px" }}
              >
                Close View
              </Button>
            )}
            {renderPageNumbers()}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;