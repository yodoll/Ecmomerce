
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
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserForm } from "src/types/User";
import api from "src/api/api";
import { toast } from "react-toastify";

const defaultTheme = createTheme();
export default function SignIn() {
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
            const { token, user } = respon.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("You're sign-in successfully");
            navigate("/");
        } catch (error: any) {
           toast.error(error);
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
                                    <Link href="/auth/register" variant="body2">
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
