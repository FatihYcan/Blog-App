import { Button, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Cards from "../components/blog/Cards";
import { Link } from "react-router-dom";
import SkeletonCard from "../pages/SkeletonCard";

const MyBlogs = () => {
  const { getUsers } = useBlogCalls();
  const { userId } = useSelector((state) => state.auth);
  const { users, loading } = useSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    getUsers({ id: userId });
  }, [userId]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = users.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "83vh",
        }}
      >
        {loading ? (
          Array.from({ length: blogsPerPage }).map((_, index) => (
            <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
              <SkeletonCard />
            </Grid>
          ))
        ) : currentBlogs.length === 0 ? (
          <>
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" color="error" align="center">
                Blog Not Found...
              </Typography>
              <Button variant="contained" component={Link} to="/new-blog">
                WRITE BLOG
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {currentBlogs.map((item, i) => (
              <Cards {...item} key={i} />
            ))}
          </>
        )}
      </Grid>
      {users.length > blogsPerPage && (
        <Stack
          spacing={2}
          sx={{ margin: 3, alignItems: "center", justifyContent: "center" }}
        >
          <Pagination
            color="primary"
            count={Math.ceil(users.length / blogsPerPage)}
            page={currentPage}
            onChange={handlePage}
          />
        </Stack>
      )}
    </React.Fragment>
  );
};

export default MyBlogs;
