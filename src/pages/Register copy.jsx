import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import RegisterForm, { registerSchema } from "../components/auth/RegisterForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";

const Register = () => {
  const { register } = useAuthCalls();

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
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              image: "",
              bio: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", my: "1rem" }}>
            Do you have an account?{" "}
            <Link to="/auth" style={{ color: "red" }}>
              Sign in
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Register;
