import * as React from "react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserForm } from "src/types/User";
import Flash from "src/components/Flash";
import api from "src/api/api";

const defaultTheme = createTheme();
export default function SignIn() {
    const [showFlash, setShowFlash] = React.useState(false);
    const [flashMessage, setFlashMessage] = React.useState("");
    const [flashSeverity, setFlashSeverity] = React.useState<"success" | "error" | "warning" | "info">("success");
    const handleCloseFlash = () => {
        setShowFlash(false);
    };
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserForm>();
    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        try {
            const respon = await api.post("/auth/login", data);
            const { token } = respon.data;
            localStorage.setItem("token", token);

            setShowFlash(true);
            setFlashMessage("You're sign-in successfully");
            setFlashSeverity("success");
              setTimeout(() => {
                navigate("/"); // Chuyển hướng sau 2 giây
            }, 2000);
        } catch (error) {
            setShowFlash(true);
            setFlashMessage("Email is not valid or password is incorrect!");
            setFlashSeverity("error");
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // Full viewport height
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Flash
                        isShow={showFlash}
                        message={flashMessage}
                        severity={flashSeverity}
                        onClose={handleCloseFlash}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                {...register("email", {
                                    required: "Email is required!",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                helperText={errors.email?.message}
                                error={!!errors.email?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                {...register("password", { required: "Password is required!" })}
                                helperText={errors.password?.message}
                                error={!!errors.password?.message}
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
