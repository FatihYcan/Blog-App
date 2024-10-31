import React from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export const registerSchema = object({
  username: string().max(20, "Username 20 karakterden az olmalıdır."),
  firstName: string().max(20, "Firstname 20 karakterden az olmalıdır."),
  lastName: string().max(20, "Lastname 20 karakterden az olmalıdır."),
  email: string().email("Lütfen geçerli bir email giriniz."),
  // image: string().url("Geçerli bir URL giriniz."),
  password: string()
    .min(8, "Password en az 8 karakter olmalıdır")
    .max(20, "Password en fazla 20 karakter olmalıdır")
    .matches(/\d+/, "Password bir sayı içermelidir")
    .matches(/[a-z]/, "Password bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(
      /[!/[@$!%*?&]+/,
      "Password en az bir özel karakter (@$!%*?&) içermelidir"
    ),
});

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              name="username"
              id="userName"
              type="text"
              variant="outlined"
              required
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={errors.username}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Firstname"
              name="firstName"
              id="firstName"
              type="text"
              variant="outlined"
              required
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Lastname"
              name="lastName"
              id="lastName"
              type="text"
              variant="outlined"
              required
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </FormControl>
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
          <FormControl fullWidth>
            <Typography component="h1" color={"gray"}>
              Image
            </Typography>
            <TextField
              name="image"
              id="image"
              type="file"
              variant="outlined"
              // value={values.image}
              accept="image/*"
              onChange={(event) => {
                // Formik'e dosya bilgisini iletmek için bir handler oluşturma
                const file = event.currentTarget.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64data = reader.result;
                    setImagePreview(base64data);
                    handleChange({
                      target: {
                        name: "image",
                        value: base64data,
                      },
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              onBlur={handleBlur}
              error={touched.image && Boolean(errors.image)}
              helperText={errors.image}
            />
          </FormControl>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}

          <FormControl fullWidth margin="normal">
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
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default RegisterForm;
