import { useEffect } from "react";
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
import { Badge, BadgeProps, Box, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuPopup from "./MenuPopup";
import { useUser } from "src/context/User";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  zIndex: 1000,
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  padding: "0 10px",
  width: "40%",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  fontFamily: "sans-serif",
  color: theme.palette.common.white,
  fontSize: "1.2rem",
  fontWeight: "bold",
  "&:hover": {
    opacity: 0.7,
    transition: "opacity 0.3s ease-in-out",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&:hover": {
    opacity: 0.7,
    transition: "opacity 0.3s ease-in-out",
  },
}));

export default function Header() {
  const theme = useTheme();
  const { user, setUser } = useUser();
  // const { cart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userInfo);
    } else {
      setUser(null);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <StyledAppBar>
      <Toolbar>
        <Box>
          <StyledLink href="/" underline="none">
            ATM LOGO
          </StyledLink>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <SearchBox>
            <InputBase
              placeholder="Tìm kiếm..."
              inputProps={{ "aria-label": "Tìm kiếm" }}
              sx={{ color: theme.palette.text.primary, flex: 1 }}
            />
            <IconButton color="inherit" aria-label="search">
              <SearchIcon sx={{ color: theme.palette.text.secondary }} />
            </IconButton>
          </SearchBox>
        </Box>
        <Tabs value={false} aria-label="navigation tabs" sx={{ width: "30%" }}>
          <Tab
            sx={{
              color: theme.palette.common.white,
              fontSize: "1rem",
              "&:hover": {
                opacity: 0.7,
                transition: "opacity 0.3s ease-in-out",
              },
            }}
            label="Sản phẩm"
            href="/"
          />
          <Tab
            sx={{
              color: theme.palette.common.white,
              fontSize: "1rem",
              "&:hover": {
                opacity: 0.7,
                transition: "opacity 0.3s ease-in-out",
              },
            }}
            label="About Us"
            href="/aboutus"
          />
          <Tab
            sx={{
              color: theme.palette.common.white,
              fontSize: "1rem",
              "&:hover": {
                opacity: 0.7,
                transition: "opacity 0.3s ease-in-out",
              },
            }}
            label="Blog"
            href="/blog"
          />
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
            <StyledBadge badgeContent={1} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          {user ? (
            <>
              <MenuPopup onLogOut={handleLogout} />
            </>
          ) : (
            <Link href="/auth/login">
              <StyledButton>Đăng nhập</StyledButton>
            </Link>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
