import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";

const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
  const { postBlogs, getCategories } = useBlogCalls();
  const { userId } = useSelector((state) => state.auth);

  const [data, setData] = React.useState({
    categoryId: "",
    title: "",
    content: "",
    image: "",
    isPublish: true,
  });

  useEffect(() => {
    getCategories("categories");
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBlogs(data);
    setData({
      categoryId: "",
      title: "",
      content: "",
      image: "",
      isPublish: true,
    });
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: "81vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "white",
          border: "2px solid white",
          borderRadius: "10px",
          boxShadow: "24px 12px 12px 12px",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "8px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "left", mb: -1, fontFamily: "fantasy" }}
          >
            New Blog
          </Typography>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Title"
              name="title"
              id="title"
              type="text"
              variant="outlined"
              required
              onChange={handleChange}
              value={data.title}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              onChange={handleChange}
              value={data.image}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel variant="outlined" id="categoryId-label" required>
              Category
            </InputLabel>

            <Select
              labelId="categoryId-label"
              label="Category"
              id="categoryId"
              name="categoryId"
              value={data?.categoryId || data?.categoryId}
              onChange={handleChange}
            >
              {categories?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="isPublish-label" required>
              Status
            </InputLabel>
            <Select
              labelId="isPublish-label"
              id="isPublish"
              name="isPublish"
              value={data.isPublish}
              label="isPublish"
              onChange={handleChange}
            >
              <MenuItem value={false}>Draft</MenuItem>
              <MenuItem value={true}>Published</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              placeholder="Content"
              multiline
              rows={3}
              label="Content"
              name="content"
              id="content"
              type="text"
              variant="outlined"
              required
              onChange={handleChange}
              value={data.content}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ my: "1rem", borderRadius: "1rem" }}
          >
            New Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewBlog;
