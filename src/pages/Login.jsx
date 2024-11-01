import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import LoginSkeleton from "../components/auth/LoginSkeleton";
import { Helmet } from "react-helmet";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "87vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

const Login = () => {
  const { login, signInProvider } = useAuthCalls();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoginSkeleton />;
  }

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog App - Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            login(values);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => <LoginForm {...props} />}
        ></Formik>

        <Box sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            onClick={() => navigate("/register")}
            style={{
              color: "red",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </Box>

        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={signInProvider}
            startIcon={<GoogleIcon color="currentColor" />}
          >
            Sign in with Google
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
};

export default Login;
