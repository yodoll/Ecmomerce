import { Box, Button, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import PageNotFound from "./PageNotFound";
import api from "src/api/api";
import { useCart } from "src/context/Cart";
import CartItem from "src/components/CartItem";

type cartItem = {
    product: Product;
    quantity: number;
};

function ProductsDetail() {
    const { id } = useParams();
    const { setCart } = useCart();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1); // State for quantity

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products/${id}`);
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

    const handleAddToCart = (product: Product) => {
        if(quantity < 0) return;
        const cartStorage = localStorage.getItem("cart") || "[]";
        let carts = JSON.parse(cartStorage) as cartItem[];
        const findCartItem = carts.find((item) => item.product._id === product._id);
        if (findCartItem) {
            carts = carts.map((item) =>
                item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
            );
        } else {
            carts.push({ product, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(carts));
        setCart(carts.length);
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
                                <IconButton>
                                    <Button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        variant="outlined"
                                        size="small" // Thêm size small cho nút -
                                        sx={{ minWidth: 100, borderRadius: 8, fontSize: 16 }} // Điều chỉnh lề và kích thước của nút -
                                    >
                                        -
                                    </Button>
                                </IconButton>
                                <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{ px: 4, py: 1, border: "1px solid #ccc", borderRadius: 8 }}
                                >
                                    {quantity}
                                </Typography>
                                <IconButton>
                                    <Button
                                        onClick={() => setQuantity(quantity + 1)}
                                        variant="outlined"
                                        size="small" // Thêm size small cho nút +
                                        sx={{ minWidth: 100, borderRadius: 8, fontSize: 16 }} // Điều chỉnh lề và kích thước của nút +
                                    >
                                        +
                                    </Button>
                                </IconButton>
                            </Box>
                            <Button
                                onClick={() => handleAddToCart(product)}
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    mb: 2,
                                    minWidth: 200,
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
