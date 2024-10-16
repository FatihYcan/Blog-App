import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { useState } from "react";
import { useEffect } from "react";
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

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const { blogs, pagination, error, categories, loading } = useSelector(
    (state) => state.blog
  );
  const { getBlogs, getCategories } = useBlogCalls();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState();
  const blogsPerPage = 9;

  useEffect(() => {
    getBlogs(`/blogs?page=${page}&limit=${blogsPerPage}`);
    getCategories("categories");
  }, [page]);

  const handlePage = (event, value) => {
    if (filteredCategory) {
      setCurrentPage(value);
    } else {
      setPage(value);
    }
  };

  const handleClick = async (categoryId) => {
    try {
      setFilteredCategory(categoryId);
      setPage(1);
      setCurrentPage(1);
      await getBlogs(
        `/blogs?page=1&limit=${pagination.totalRecords}&categoryId=${categoryId}`
      );
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (filteredCategory) {
      const filteredBlogs = blogs.filter(
        (blog) => blog.categoryId === filteredCategory
      );
      setFilteredBlog(filteredBlogs);
    }
  }, [blogs, filteredCategory, currentPage]);

  const handleAll = () => {
    setFilteredCategory(null); // Kategori filtresini sıfırla
    setFilteredBlog([]); // Filtrelenmiş blogları sıfırla
    getBlogs(`/blogs?page=1&limit=${blogsPerPage}`);
    setPage(1);
    setCurrentPage(1);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlog.slice(indexOfFirstBlog, indexOfLastBlog);

  const isAllCategories = !filteredCategory;

  console.log(currentBlogs.length);
  // console.log(filteredBlog);
  console.log(filteredCategory);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}
      >
        <Search />
      </Box>
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
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip onClick={handleAll} size="medium" label="All categories" />
          {categories.map((item) => (
            <Chip
              key={item._id}
              onClick={() => handleClick(item._id)}
              size="medium"
              label={item.name}
              sx={{
                backgroundColor: "transparent",
                border: "none",
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}
        >
          <Search />
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
        ) : currentBlogs.length === 0 && filteredCategory ? ( // Sadece kategori seçildiğinde ve hiç blog yoksa
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
              Blog Yoktur...
            </Typography>
            <Button variant="contained" onClick={() => navigate("/new-blog")}>
              WRITE BLOG
            </Button>
          </Container>
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
          (currentBlogs.length > 0 ? currentBlogs : blogs).map((item) => {
            const category = categories.find(
              (cat) => cat._id === item.categoryId
            );
            return (
              <Cards key={item._id} {...item} category={category} page={page} />
            );
          })
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
            count={pagination?.pages?.total}
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
