import React from "react";
import { Typography, Container, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
        marginTop: "auto",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Thành viên nhóm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hải Anh (PH31341) - Frontend Developer <br />
              Tiến Mạnh (PH31914)- Frontend Developer <br />
              Trịnh Tùng (PH31917) - Frontend Developer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: contact@example.com <br />
              Điện thoại: +84 123 456 789
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Tên Công Ty. All rights reserved.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "10px" }}
            >
              <Link color="inherit" href="/terms">
                Điều khoản sử dụng
              </Link>{" "}
              |{" "}
              <Link color="inherit" href="/privacy">
                Chính sách bảo mật
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;