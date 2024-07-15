import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import { useNavigate } from "react-router-dom";
import api from "src/api/api";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function SignUp() {
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
            await api.post("/auth/register", data);
            toast.success("You're sign-up successfully");
            navigate("/auth/login");
        } catch (error: any) {
            toast.error(error.data.message);
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                                <Link href="auth/login" variant="body2">
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
