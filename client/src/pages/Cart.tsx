import { Box, Stack, Typography } from "@mui/material";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import CartItem from "src/components/CartItem";
const Cart = () => {
    return (
        <>
            <Header />
            <Box p={6}>
                <Box p={5}>
                    <CartItem />
                    <Box px={10}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle1" fontWeight="fontWeightBold">
                                Tổng phụ:
                            </Typography>
                            <Typography>$100</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle1" fontWeight="fontWeightBold">
                                Tiền Ship:
                            </Typography>
                            <Typography>Free</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" mt={2}>
                            <Typography variant="subtitle1" fontWeight="fontWeightBold">
                                Tổng hóa đơn:
                            </Typography>
                            <Typography fontWeight="fontWeightBold">$100</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Cart;