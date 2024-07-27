import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Container,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ConfirmDialog from "src/components/ConfirmDialog";
import { useLoading } from "src/context/Loading";
import { toast } from "react-toastify";
import useProduct from "src/hooks/Product";

function AdminProductList() {
    const { loading, setLoading } = useLoading();
    const [confirm, setConfirm] = useState(false);
    // const [products, setProducts] = useState<Product[]>([]);
    const { products, getProducts, deleteProduct } = useProduct();
    const [idDelete, setIdDelete] = useState<string | null>(null);

    const getAllProduct = async () => {
        try {
            setLoading(true);
            await getProducts();
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllProduct();
    }, []);

    const handleConfirm = (id: string) => {
        if (id) {
            setConfirm(true);
            setIdDelete(id);
        } else {
            console.error("Invalid product ID");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(`${idDelete}`);
            toast.success(`Successfully deleted`);
            getAllProduct();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Container sx={{ padding: "20px 0" }}>
            {loading ? (
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <LinearProgress style={{ width: "100%", marginTop: "10px" }} />
                </Grid>
            ) : (
                <Stack spacing={2}>
                    <Typography variant="h2" align="center">
                        Product List
                    </Typography>
                    <Link to="/admin/products/add">
                        <Button variant="contained" color="primary">
                            Add Product
                        </Button>
                    </Link>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} lg={10}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 800 }} aria-label="product table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Image</TableCell>
                                            <TableCell align="right">Category</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product._id}>
                                                <TableCell component="th" scope="row">
                                                    {product.title}
                                                </TableCell>
                                                <TableCell align="right">{product.price}</TableCell>
                                                <TableCell align="right">{product.description}</TableCell>
                                                <TableCell align="right">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        style={{
                                                            maxWidth: 100,
                                                            height: "auto",
                                                            borderRadius: 5,
                                                            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">{product.category.name}</TableCell>
                                                {/* <TableCell align="right">
                                                    <Stack direction="column" spacing={1}>
                                                        {product.variations.map((variation, index) => (
                                                            <div key={index}>
                                                                <Typography variant="body2">
                                                                    Size: {variation.size}, Stock: {variation.stock}
                                                                </Typography>
                                                            </div>
                                                        ))}
                                                    </Stack>
                                                </TableCell> */}
                                                <TableCell align="right">
                                                    <Stack direction="row" spacing={1}>
                                                        <Link to={`/admin/products/edit/${product._id}`}>
                                                            <Button variant="contained" color="info">
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleConfirm(product._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Stack>
            )}
            <ConfirmDialog confirm={confirm} onConfirm={setConfirm} onDelete={handleDelete} />
        </Container>
    );
}

export default AdminProductList;
