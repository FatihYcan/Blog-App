import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
} from "@mui/material";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateModal({ open, handleClose, data, setData }) {
  const { _id } = useParams();
  const { categories } = useSelector((state) => state.blog);
  const { getCategories, putBlogs, getDetails } = useBlogCalls();

  React.useEffect(() => {
    getCategories("categories");
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putBlogs(_id, data);
    handleClose();
    getDetails({ id: _id });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ marginTop: "8px" }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "left", mb: -1, fontFamily: "fantasy" }}
              >
                Update Blog
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
                  <MenuItem value="false">Draft</MenuItem>
                  <MenuItem value="true">Published</MenuItem>
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
                Update Blog
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}
