import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import PageNotFound from "./PageNotFound";
import api from "src/api/api";

function ProductsDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // State for quantity

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                console.log('Product data:', data);
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
        return <PageNotFound />;
    }

    return (
        <>
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
                                    src={product.image}
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
                        <Grid key={product._id} item xs={12} md={6}>
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
                                    Category: {product.category.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Description: {product.description}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default ProductsDetail;
