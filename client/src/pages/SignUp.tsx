import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserForm } from "src/types/User";
import { useForm, SubmitHandler } from "react-hook-form";
import bcrypt from "bcryptjs";
import axios from "axios";
import Flash from "src/components/Flash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function SignUp() {
    const [showFlash, setShowFlash] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserForm>();
    const password = watch("password");
    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10); // Sử dụng 10 vòng lặp
            const hashedConfirmPassword = await bcrypt.hash(data.confirmPassword, 10);
            await axios.post("http://localhost:3000/user", {
                ...data,
                password: hashedPassword,
                confirmPassword: hashedConfirmPassword,
            });
            setShowFlash(true);
            setTimeout(() => {
                navigate("/login"); // Chuyển hướng sau 3-4 giây
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Flash isShow={showFlash} />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="User"
                                    label="Username"
                                    {...register("username", { required: "Username is required!" })}
                                    helperText={errors.username ? errors.username.message : ""}
                                    error={!!errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "Email is required!",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    helperText={errors.email ? errors.email.message : ""}
                                    error={!!errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: "Password is required!",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    })}
                                    helperText={errors.password ? errors.password.message : ""}
                                    error={!!errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("confirmPassword", {
                                        required: "confirmPassword is required!",
                                        validate: (value) => value === password || "Password is not match!",
                                    })}
                                    helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                                    error={!!errors.confirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
