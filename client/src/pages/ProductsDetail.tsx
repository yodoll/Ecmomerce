import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Typography,
    Rating,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { Product } from "../types/Product";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  
  function ProductsDetail() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // State for quantity
  
    useEffect(() => {
      const getProduct = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `http://localhost:3000/products/${id}`
          );
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        getProduct();
      }
    }, [id]);
  
    const handleAddToCart = () => {
      // Logic to add product to cart, e.g., dispatch an action or update state
      console.log(`Added ${quantity} ${product?.title}(s) to cart`);
    };
  
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h5">Loading...</Typography>
        </Box>
      );
    }
  
    if (!product) {
      return (
        <Typography variant="h6" align="center">
          Product not found.
        </Typography>
      );
    }
  
    return (
      <>
        <Header />
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            paddingTop: "80px",
            paddingBottom: "40px",
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: "relative",
                    paddingBottom: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  ${product.price}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    variant="outlined"
                    size="small" // Thêm size small cho nút -
                    sx={{ minWidth: 0, mr: 1, borderRadius: 8 }} // Điều chỉnh lề và kích thước của nút -
                  >
                    -
                  </Button>
                  <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                    {quantity}
                  </Typography>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    variant="outlined"
                    size="small" // Thêm size small cho nút +
                    sx={{ minWidth: 0, ml: 1, borderRadius: 8 }} // Điều chỉnh lề và kích thước của nút +
                  >
                    +
                  </Button>
                </Box>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mb: 2,
                    borderRadius: 8,
                    boxShadow: "none",
                    textTransform: "none",
                  }}
                >
                  Add to Cart
                </Button>
                <Typography variant="body2" color="textSecondary">
                  Free Shipping. 30-Day Return.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Category: {product.category}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Shipping Information: {product.shippingInformation}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Rating:
                  </Typography>
                  <Rating
                    name="product-rating"
                    value={product.rating} // Assume product.rating is a number (e.g., 4.5)
                    precision={0.5} // Optional: độ chính xác của số sao (có thể là 0.5 hoặc 1)
                    readOnly // Để không cho phép người dùng thay đổi đánh giá
                    sx={{ fontSize: "1.2rem" }} // Điều chỉnh kích thước của Rating
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>{" "}
        {/* End of product details section */}
        <Footer />
      </>
    );
  }
  
  export default ProductsDetail;