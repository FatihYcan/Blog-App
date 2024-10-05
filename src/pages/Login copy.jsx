import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";

const Login = () => {
  const { login } = useAuthCalls();

  return (
    <Container maxWidth="lg" sx={{ minHeight: "90vh" }}>
      <Container maxWidth="xs">
        <Box
          marginTop="2rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            sx={{
              backgroundColor: "#0d47a1",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography variant="h4" align="center" mb={1} color="#0d47a1">
            Log in
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

          <Box sx={{ textAlign: "center", my: "1rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "red" }}>
              Sign up
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
