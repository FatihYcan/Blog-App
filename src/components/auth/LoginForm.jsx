import React from "react";
import { Box, FormControl, Grid, Link } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import useAuthCalls from "../../hooks/useAuthCalls";
import { toastErrorNotify } from "../../helper/ToastNotify";

export const loginSchema = object({
  email: string().email("Lütfen geçerli bir email giriniz."),
  password: string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(20, "Şifre en fazla 20 karakter olmalıdır")
    .matches(/\d+/, "Şifre bir sayı içermelidir")
    .matches(/[a-z]/, "Şifre bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre bir büyük harf içermelidir")
    .matches(
      /[!/[@$!%*?&]+/,
      "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
    ),
});

const LoginForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
  setFieldValue,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { forgotPassword } = useAuthCalls();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPassword = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find((user) => user.email === values.email);

    if (foundUser) {
      forgotPassword();
      setFieldValue("password", foundUser.password);
    } else {
      toastErrorNotify("Lütfen sisteme kayıtlı email adresini giriniz.");
    }
  };

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              name="email"
              id="email"
              type="email"
              variant="outlined"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={errors.email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Box sx={{ textAlign: "end" }}>
              <Link
                component="button"
                type="button"
                onClick={handleForgotPassword}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
                style={{
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              label="Password"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: "1rem" }}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default LoginForm;
