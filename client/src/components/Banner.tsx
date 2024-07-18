import { Box, Stack, styled, Typography } from "@mui/material";

const Banner = () => {
    return (
        <>
            <BannerImage>
                <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
                    <img />
                    <Typography fontSize={48}>Cart</Typography>
                    <Stack direction={"row"}>
                        <Typography fontWeight={500}>Home</Typography>
                        <Typography fontWeight={300}>Cart</Typography>
                    </Stack>
                </Stack>
            </BannerImage>
        </>
    );
};

const BannerImage = styled(Box)({
    backgroundImage: "url(./banner1.webp)",
    height: "641px",
});

export default Banner;
