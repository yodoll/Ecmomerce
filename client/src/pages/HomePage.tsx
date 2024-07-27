import { useState } from "react";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import CardProduct from "src/components/CardProduct";
import useProduct from "src/hooks/Product";
import { useLoading } from "src/context/Loading";

function Homepage() {
    const { products } = useProduct();
    const { loading} = useLoading();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [viewAll, setViewAll] = useState<boolean>(false); // State to manage view all products
    const productsPerPage = 8;

    // eslint-disable-next-line react-hooks/exhaustive-deps

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

    // const indexOfLastProduct = viewAll
    //   ? products.length
    //   : currentPage * productsPerPage;
    // const indexOfFirstProduct = viewAll
    //   ? 0
    //   : indexOfLastProduct - productsPerPage;
    // const currentProducts = products.slice(
    //   indexOfFirstProduct,
    //   indexOfLastProduct
    // );

    return (
        <>
            <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                <Grid container spacing={3} justifyContent="center">
                    <Typography variant="h5">Hello</Typography>
                    {loading ? (
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <LinearProgress style={{ width: "100%", marginTop: "10px" }} />
                        </Grid>
                    ) : (
                        products.map((product, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <CardProduct
                                    _id={product._id}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    category={product.category}
                                    description={""}

                                    // variations={[]}
                                />
                            </Grid>
                        ))
                    )}

                    <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
                        {!viewAll ? (
                            <Button variant="contained" onClick={handleViewAllProducts} style={{ margin: "5px" }}>
                                View All Products
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleCloseViewAll} style={{ margin: "5px" }}>
                                Close View
                            </Button>
                        )}
                        {renderPageNumbers()}
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Homepage;
