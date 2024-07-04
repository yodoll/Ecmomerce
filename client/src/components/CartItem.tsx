import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';

const CartItem = () => {
    const [amount, setAmount] = useState(1);
    const increaseAmount = () => {
        setAmount(prevAmount => prevAmount + 1);
    };

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(prevAmount => prevAmount - 1);
        }
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" fontWeight="fontWeightBold" fontSize="h6.fontSize" mb={5}>
                <Grid item xs={2} textAlign="center">Image</Grid>
                <Grid item xs={2} textAlign="center">Name</Grid>
                <Grid item xs={2} textAlign="center">Price</Grid>
                <Grid item xs={2} textAlign="center">Amount</Grid>
                <Grid item xs={2} textAlign="center">Total</Grid>
                <Grid item xs={2} textAlign="center">Role</Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" textAlign="center">
                <Grid item xs={2}><img src="https://picsum.photos/200" alt="" /></Grid>
                <Grid item xs={2}>
                    <Stack spacing={2}>
                        <Typography noWrap>Tên SP1</Typography>
                        <Typography noWrap>Tên DM1</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2}>$100</Grid>
                <Grid item xs={2}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={decreaseAmount}>-</Button>
                        <Box display="flex" justifyContent="center" alignItems="center" bgcolor="grey.200" px={2} py={1} width="100%">
                            <Typography variant="h6">{amount}</Typography>
                        </Box>
                        <Button variant="contained" color="primary" onClick={increaseAmount}>+</Button>
                    </Stack>
                </Grid>
                <Grid item xs={2}>$100</Grid>
                <Grid item xs={2}>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Box borderBottom={1} borderColor="grey.300" my={3}></Box>
        </>
    );
}

export default CartItem;