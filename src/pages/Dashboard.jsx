import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import SkeletonCard from "../pages/SkeletonCard";
import { Grid, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";

const Dashboard = () => {
  const { blogs, pagination } = useSelector((state) => state.blog);
  const { getBlogs } = useBlogCalls();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getBlogs(`/blogs?page=${page}&limit=10`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
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
          Array.from({ length: blogs.length }).map((_, index) => (
            <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
              <SkeletonCard />
            </Grid>
          ))
        ) : blogs.length === 0 ? (
          <Typography variant="h4" color="error" align="center">
            Blog Not Found...
          </Typography>
        ) : (
          <>
            {blogs.map((item, i) => (
              <Card key={i} {...item} page={page} />
            ))}
          </>
        )}
      </Grid>
      {blogs.length > 0 && (
        <Stack
          spacing={2}
          sx={{ margin: 3, alignItems: "center", justifyContent: "center" }}
        >
          <Pagination
            color="primary"
            count={pagination?.pages?.total}
            page={page}
            onChange={handlePage}
          />
        </Stack>
      )}
    </>
  );
};

export default Dashboard;
