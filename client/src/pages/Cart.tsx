import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import Banner from "src/components/Banner";
import CartItem from "src/components/CartItem";

const labels = ["Image", "Name", "Price", "Amount", "Total", "Role"];

const Cart = () => {
    return (
        <>
            <Banner />
            <Wrapper>
                <Box p={5}>
                    <Grid container alignItems="center" justifyContent="space-between" fontWeight="fontWeightBold" fontSize="h6.fontSize" mb={5}>
                        {labels.map((label, index) => {
                            return <Grid key={index} item xs={2} textAlign="center">{label}</Grid>
                        })}
                    </Grid>
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
            </Wrapper>
        </>
    );
};

const Wrapper = styled(Box)({
    padding: 48
})

export default Cart;