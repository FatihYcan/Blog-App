import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";

export default function BlogCard({
  page,
  _id,
  id,
  title,
  content,
  image,
  comments,
  likes,
  countOfVisitors,
  createdAt,
}) {
  const { userId } = useSelector((state) => state.auth);
  const { postLikes, getBlogs } = useBlogCalls();
  const navigate = useNavigate();

  const handleLike = async () => {
    if (userId) {
      await postLikes("blogs", _id);
      await getBlogs(`/blogs?page=${page}&limit=10`);
    } else {
      navigate("/auth");
    }
  };

  const handleDetail = () => {
    navigate(`/detail/${_id}`);
  };

  return (
    <Grid item key={_id} xs={12} md={6} lg={4} xl={3}>
      <Card elevation={24} sx={{ margin: "10px" }}>
        <Typography
          variant="body1"
          component="div"
          sx={{ display: "flex", justifyContent: "center", height: "150px" }}
        >
          <CardMedia
            component="img"
            alt={title}
            image={image}
            sx={{
              height: "175px",
              width: "350px",
              margin: "auto",
              objectFit: "contain",
              paddingTop: 2,
            }}
          />
        </Typography>

        <Typography
          variant="body1"
          component="div"
          sx={{ width: "100%", height: "150px", marginTop: "8px" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              marginTop: "2rem",
              textTransform: "uppercase",
              textAlign: "center",
              color: "darkblue",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              margin: "16px",
            }}
          >
            {content}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="span"
            sx={{ textAlign: "left", margin: "16px" }}
          >
            Published Date : {createdAt && new Date(createdAt).toLocaleString()}
          </Typography>
        </Typography>

        <Typography
          variant="body1"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "16px",
          }}
        >
          <Typography variant="body1" component="div">
            <IconButton
              aria-label="add to favorites"
              sx={{ textAlign: "left" }}
              onClick={handleLike}
            >
              {likes?.includes(userId) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteIcon />
              )}
              <span> {likes.length} </span>
            </IconButton>
            <IconButton aria-label="comments" sx={{ textAlign: "left" }}>
              <ChatBubbleOutlineIcon />
              <span> {comments.length}</span>
            </IconButton>
            <IconButton aria-label="view" sx={{ textAlign: "left" }}>
              <VisibilityOutlinedIcon />
              <span> {countOfVisitors}</span>
            </IconButton>
          </Typography>
          <Button variant="contained" onClick={handleDetail}>
            READ MORE
          </Button>
        </Typography>
      </Card>
    </Grid>
  );
}
