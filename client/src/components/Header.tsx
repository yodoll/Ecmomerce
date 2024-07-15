import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import {Badge, BadgeProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuPopup from "./MenuPopup";

const styles = {
    appBar: {
        position: "fixed",
        top: 0,
        zIndex: 1000,
        margin: 0,
        padding: 0
    },
};
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AppBar position="static" sx={styles.appBar}>
            <Toolbar>
                <Box>
                    <Link
                        href="/"
                        underline="none"
                        sx={{ fontFamily: "sans-serif", color: "white", "&:hover": { opacity: 0.5 } }}
                    >
                        ATM LOGO
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            bgcolor: "white",
                            borderRadius: "4px",
                            width: "30%",
                        }}
                    >
                        <InputBase
                            placeholder="Tìm kiếm..."
                            inputProps={{ "aria-label": "Tìm kiếm" }}
                            sx={{ mr: 1, pl: 1 }}
                        />
                        <IconButton color="inherit" aria-label="search">
                            <SearchIcon sx={{ color: "black" }} />
                        </IconButton>
                    </Box>
                </Box>
                <Tabs value={false} aria-label="navigation tabs" sx={{ width: "30%" }}>
                    <Tab sx={{ color: "white", "&:hover": { opacity: 0.5 } }} label="Sản phẩm" href="/" />
                    <Tab sx={{ color: "white", "&:hover": { opacity: 0.5 } }} label="About Us" href="/aboutus" />
                    <Tab sx={{ color: "white", "&:hover": { opacity: 0.5 } }} label="Blog" href="/blog" />
                    {/* Thêm các tab khác nếu cần */}
                </Tabs>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "15%",
                        ml: "15px",
                    }}
                >
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={4} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                    {isLoggedIn ? (
                        <>
                            <MenuPopup onLogOut={handleLogout} />
                        </>
                    ) : (
                        <Link href="/auth/login">
                            <Button sx={{ color: "white", "&:hover": { opacity: 0.5 } }}>Đăng nhập</Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
