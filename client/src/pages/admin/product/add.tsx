import { Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductForm from "src/components/ProductForm";
import { useLoading } from "src/context/Loading";
import useProduct from "src/hooks/Product";
import { ProductFormParams } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();
  const { setLoading } = useLoading();
  const {addProduct} = useProduct();
  const onSubmit = async (values: ProductFormParams) => {
    try {
      setLoading(true);
      await addProduct(values);
      nav("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"}>
            Add Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={{ isShow: true }} />
        </Stack>
      </Container>
    </>
  );
}

export default AdminProductAdd;
