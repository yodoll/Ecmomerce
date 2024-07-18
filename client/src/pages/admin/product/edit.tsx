import { Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "src/api/api";
import ProductForm from "src/components/ProductForm";
import { Product, ProductFormParams } from "src/types/Product";

function AdminProductEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();

  const getProduct = async (id: string) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await api.put(`/products/${id}`, values);
      nav("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Edit Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={product} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductEdit;
