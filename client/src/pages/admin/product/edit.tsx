import { Container, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/context/Loading";
import useProduct from "src/hooks/Product";
import { Product, ProductFormParams } from "src/types/Product";

function AdminProductEdit() {
    const nav = useNavigate();
    const { loading, setLoading } = useLoading();
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();
    const { updateProduct, getProductById } = useProduct();

    const getProduct = async (id: string) => {
        if(id) {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        if (!id) return;
        getProduct(id);
    }, [id]);

    const onSubmit = async (values: ProductFormParams) => {
        setLoading(true);
        try {
            await updateProduct(values);
            toast.success("Edit product successfully");
            nav("/admin/products");
        } catch (error) {
            toast.error("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container>
                {loading ? (
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <LinearProgress style={{ width: "100%", marginTop: "10px" }} />
                    </Grid>
                ) : (
                    <Stack gap={2}>
                        <Typography variant="h3" textAlign={"center"}>
                            Edit Product
                        </Typography>
                        <ProductForm onSubmit={onSubmit} initialValues={product} />
                    </Stack>
                )}
            </Container>
        </>
    );
}

export default AdminProductEdit;
