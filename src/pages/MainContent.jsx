import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Cards from "../components/blog/Cards";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const { blogs, pagination, categories, loading } = useSelector(
    (state) => state.blog
  );
  const { getBlogs, getCategories } = useBlogCalls();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState();
  const blogsPerPage = 9;
  const [categoriesSelected, setCategoriesSelected] = useState(true);

  useEffect(() => {
    getBlogs(`/blogs?page=${page}&limit=${pagination.totalRecords}`);
    getCategories("categories");
  }, []);

  const handlePage = (event, value) => {
    if (filteredCategory) {
      setCurrentPage(value);
    } else {
      setPage(value);
    }
  };

  const handleClick = async (categoryId) => {
    setFilteredCategory(categoryId);
    setPage(1);
    setCurrentPage(1);
    setCategoriesSelected(false);
    await getBlogs(`/blogs?page=1&limit=${pagination.totalRecords}`);
  };

  useEffect(() => {
    const allBlogs = blogs.filter(
      (blog) => blog._id !== "67111b9f3ec8b710e80612f0"
    );

    if (filteredCategory) {
      const filteredBlogs = allBlogs.filter(
        (blog) => blog.categoryId === filteredCategory
      );
      setFilteredBlog(filteredBlogs);
    } else {
      setFilteredBlog(allBlogs);
    }
  }, [blogs, filteredCategory]);

  const handleAll = () => {
    setFilteredCategory(null);
    setFilteredBlog([]);
    setCategoriesSelected(true);
    getBlogs(`/blogs?page=${page}&limit=${pagination.totalRecords}`);
    setPage(1);
    setCurrentPage(1);
  };

  const indexOfLastBlog =
    filteredBlog.length > 0 ? currentPage * blogsPerPage : page * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs =
    filteredBlog.length > 0
      ? filteredBlog.slice(indexOfFirstBlog, indexOfLastBlog)
      : blogs
          .filter((blog) => blog._id !== "67111b9f3ec8b710e80612f0")
          .slice(indexOfFirstBlog, indexOfLastBlog);

  const isAllCategories = !filteredCategory;

  const uniqueCategories = [...new Set(blogs.map((blog) => blog.categoryId))];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          width: "100%",
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            overflow: "auto",
            justifyContent: "center",
          }}
        >
          <Chip
            onClick={handleAll}
            size="medium"
            label="All categories"
            sx={{
              backgroundColor: categoriesSelected
                ? "rgba(0, 0, 0, 0.08)"
                : "transparent",
              border: "none",
            }}
          />
          {uniqueCategories.map((categoryId) => {
            const category = categories.find((cat) => cat._id === categoryId);

            const otherBlogs = blogs.some(
              (blog) =>
                blog.categoryId === categoryId &&
                blog._id !== "67111b9f3ec8b710e80612f0"
            );

            return category && otherBlogs ? (
              <Chip
                key={categoryId}
                onClick={() => handleClick(category._id)}
                size="medium"
                label={category.name}
                sx={{
                  backgroundColor:
                    filteredCategory === categoryId
                      ? "rgba(0, 0, 0, 0.18)"
                      : "transparent",
                  border: "none",
                }}
              />
            ) : null;
          })}
        </Box>
      </Box>
      <Grid container rowSpacing={2} columnSpacing={2} justifyContent="center">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Skeleton variant="rectangular" height={250} />
              <Skeleton variant="text" height={40} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} />
            </Grid>
          ))
        ) : blogs.length === 0 ? (
          <Container
            spacing={2}
            sx={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "69vh",
            }}
          >
            <Typography
              variant="h4"
              color="error"
              align="center"
              marginBottom={3}
            >
              Blog Not Found...
            </Typography>
            <Button variant="contained" onClick={() => navigate("/new-blog")}>
              WRITE BLOG
            </Button>
          </Container>
        ) : (
          currentBlogs.map((item) => (
            <Cards
              key={item._id}
              {...item}
              category={categories.find((cat) => cat._id === item.categoryId)}
              page={page}
              pagination={pagination}
            />
          ))
        )}
      </Grid>

      {isAllCategories && pagination.totalRecords > 9 && (
        <Stack
          spacing={2}
          sx={{
            marginBottom: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pagination
            color="primary"
            count={Math.ceil(blogs.length / blogsPerPage)}
            page={page}
            onChange={handlePage}
          />
        </Stack>
      )}

      {!isAllCategories && filteredBlog.length > blogsPerPage && (
        <Stack
          spacing={2}
          sx={{ margin: 3, alignItems: "center", justifyContent: "center" }}
        >
          <Pagination
            color="primary"
            count={Math.ceil(filteredBlog.length / blogsPerPage)}
            page={currentPage}
            onChange={handlePage}
          />
        </Stack>
      )}
    </Box>
  );
}
