// src/components/Homepage.tsx

import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CardProduct from "src/components/CardProduct";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useHomepageLogic } from "src/hooks/homepageLogic";
import {
  CenteredGrid,
  Container,
  PageButton,
  ScrollToTopButton,
} from "src/hooks/styledComponents";
interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <>
    <PageButton
      variant="contained"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      <ArrowLeft></ArrowLeft>
    </PageButton>

    {[...Array(totalPages)].map((_, i) => (
      <PageButton
        key={i + 1}
        variant={currentPage === i + 1 ? "contained" : "outlined"}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </PageButton>
    ))}
    <PageButton
      variant="contained"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      <ArrowRight></ArrowRight>
    </PageButton>
  </>
);

const Homepage = () => {
  const {
    products,
    loading,
    currentPage,
    viewAll,
    showScrollButton,
    totalPages,
    handleScrollToTop,
    handlePageChange,
    setViewAll,
  } = useHomepageLogic();
  const productsPerPage = 8;

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
    <Container>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            Hello
          </Typography>
        </Grid>
        {loading ? (
          <CenteredGrid item xs={12}>
            <LinearProgress style={{ width: "100%", marginTop: "10px" }} />
          </CenteredGrid>
        ) : (
          currentProducts.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardProduct
                _id={product._id}
                title={product.title}
                image={product.image || "placeholder-image-url.jpg"}
                price={product.price}
                category={product.category}
                description={""}
              />
            </Grid>
          ))
        )}

        <CenteredGrid item xs={12} style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={() => setViewAll(!viewAll)}
            style={{ margin: "5px" }}
          >
            {viewAll ? "Close View" : "View All Products"}
          </Button>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CenteredGrid>
      </Grid>
      {showScrollButton && (
        <ScrollToTopButton color="primary" onClick={handleScrollToTop}>
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      )}
    </Container>
  );
};

export default Homepage;
