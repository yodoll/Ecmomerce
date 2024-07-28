import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import PageNotFound from "./PageNotFound";
import { useCart } from "src/hooks/Cart";
import { useLoading } from "src/context/Loading";
import useProduct from "src/hooks/Product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../types/Product";
import styled from "@emotion/styled";

const SearchBox = styled(Box)({
  backgroundColor: "#f9f9f9",
  paddingTop: "80px",
  paddingBottom: "40px",
});

const ProductImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "28px",
  border: "2px solid #ddd",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
});

const ProductBox = styled(Box)`
  position: relative;
  padding-bottom: 70%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  margin: auto;
`;

const QuantityButton = styled(Button)({
  minWidth: 50,
  borderRadius: 2,
});

const QuantityDisplay = styled(Typography)({
  mx: 2,
  px: 2,
  py: 1,
  border: "1px solid #ccc",
  borderRadius: 2,
});

const AddToCartButton = styled(Button)({
  mb: 2,
  minWidth: 200,
  borderRadius: 2,
  boxShadow: "none",
  textTransform: "none",
});

const RelatedProductCard = styled(Card)({
  height: "100%",
  margin: "0 15px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
});

const RelatedProductMedia = styled(CardMedia)({
  height: 200,
  objectFit: "cover",
  borderRadius: 8,
});

function ProductsDetail() {
  const { id } = useParams<string>();
  const { loading, setLoading } = useLoading();
  const { getProductById, getProductsByCategory } = useProduct();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

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

  const handleAddToCart = (product: Product) => {
    if (quantity < 0) return;
    addToCart(product, quantity);
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SearchBox>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductBox>
              <ProductImage src={product.image} alt={product.title} />
            </ProductBox>
          </Grid>
          <Grid key={product._id} item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              ${product.price}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <QuantityButton
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                variant="outlined"
                size="small"
              >
                -
              </QuantityButton>
              <QuantityDisplay variant="body1">{quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() => setQuantity(quantity + 1)}
                variant="outlined"
                size="small"
              >
                +
              </QuantityButton>
            </Box>
            <AddToCartButton
              onClick={() => handleAddToCart(product)}
              variant="contained"
              color="primary"
              size="large"
            >
              Add to Cart
            </AddToCartButton>
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Slider {...settings}>
            {relatedProducts.slice(0, 6).map((relatedProduct) => (
              <Box key={relatedProduct._id} p={2}>
                <RelatedProductCard>
                  <RelatedProductMedia image={relatedProduct.image} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {relatedProduct.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${relatedProduct.price}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/products/${relatedProduct._id}`}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </RelatedProductCard>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </SearchBox>
  );
}

export default ProductsDetail;
