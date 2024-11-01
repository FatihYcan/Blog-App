import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import GoogleIcon from "../assets/icons/GoogleIcon";
import useAuthCalls from "../hooks/useAuthCalls";
import { Formik } from "formik";
import RegisterForm, { registerSchema } from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import RegisterSkeleton from "../components/auth/RegisterSkeleton";
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
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
}));

const Register = () => {
  const { register, signUpProvider } = useAuthCalls();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <RegisterSkeleton />;
  }

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog App - Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>

        <Formik
          initialValues={{
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            image: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (values, actions) => {
            const isRegistered = await register(values);

            if (isRegistered) {
              actions.resetForm();
            }
            actions.setSubmitting(false);
          }}
          component={(props) => <RegisterForm {...props} />}
        ></Formik>

        <Box sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/login")}
            style={{
              color: "red",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={signUpProvider}
            startIcon={<GoogleIcon color="currentColor" />}
          >
            Sign up with Google
          </Button>
        </Box>
      </Card>
    </SignUpContainer>
  );
};

export default Register;
