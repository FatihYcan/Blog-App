import { Button, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import MyCards from "../components/blog/MyCards";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyBlogs = () => {
  const { getUsers, getCategories } = useBlogCalls();
  const { userId } = useSelector((state) => state.auth);
  const { users, loading, categories, likes } = useSelector(
    (state) => state.blog
  );
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState();
  const [categoriesSelected, setCategoriesSelected] = useState(true);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    getUsers({ id: userId });
    getCategories("categories");
  }, [likes]);

  const indexOfLastBlog =
    filteredBlog.length > 0 ? currentPage * blogsPerPage : page * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs =
    filteredBlog.length > 0
      ? filteredBlog.slice(indexOfFirstBlog, indexOfLastBlog)
      : users.slice(indexOfFirstBlog, indexOfLastBlog);

  const isAllCategories = !filteredCategory;

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
    await getUsers({ id: userId });
  };

  useEffect(() => {
    if (filteredCategory) {
      const filteredBlogs = users.filter(
        (user) => user.categoryId === filteredCategory
      );
      setFilteredBlog(filteredBlogs);
    }
  }, [users, filteredCategory]);

  const handleAll = () => {
    setFilteredCategory(null);
    setFilteredBlog([]);
    setCategoriesSelected(true);
    getUsers({ id: userId });
    setPage(1);
    setCurrentPage(1);
  };

  const uniqueCategories = [...new Set(users.map((user) => user.categoryId))];

  return (
    <Container
      maxWidth="xl"
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginBottom: 2,
        minHeight: "84vh",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog App - My Blogs</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
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
            {users.length > 0 && (
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
            )}
            {uniqueCategories.map((categoryId) => {
              const category = categories.find((cat) => cat._id === categoryId);
              return category ? (
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
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          justifyContent="center"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Skeleton variant="rectangular" height={250} />
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </Grid>
            ))
          ) : users.length === 0 ? (
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
            currentBlogs.map((item) => {
              const category = categories.find(
                (cat) => cat._id === item.categoryId
              );
              return (
                <MyCards
                  key={item._id}
                  {...item}
                  category={category}
                  page={page}
                />
              );
            })
          )}
        </Grid>
        {isAllCategories && users.length > blogsPerPage && (
          <Stack
            spacing={2}
            sx={{ margin: 3, alignItems: "center", justifyContent: "center" }}
          >
            <Pagination
              color="primary"
              count={Math.ceil(users.length / blogsPerPage)}
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
    </Container>
  );
};

export default MyBlogs;
