import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useEffect } from "react";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const capitalizeFirstLetter = (string) => {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function BlogCard({
  page,
  _id,
  title,
  content,
  image,
  comments,
  likes,
  countOfVisitors,
  createdAt,
  category,
}) {
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { getUsers, postLikes } = useBlogCalls();

  useEffect(() => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [image]);

  const isTallImage = imageSize.height > imageSize.width;

  const handleDetail = () => {
    navigate(`/detail/${_id}`);
  };

  const handleLike = () => {
    postLikes("blogs", _id);
    getUsers({ id: userId });
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={_id}>
      <SyledCard variant="outlined">
        <CardMedia
          onClick={handleDetail}
          component="img"
          alt={title}
          image={image}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            height: "250px",
            objectFit: isTallImage ? "contain" : "cover",
          }}
        />
        <SyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {category && category.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {capitalizeFirstLetter(title)}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {content}
          </StyledTypography>
        </SyledCardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,

            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="caption">
              <IconButton aria-label="add to favorites" onClick={handleLike}>
                {likes?.includes(userId) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteIcon />
                )}
                <span> {likes.length} </span>
              </IconButton>
            </Typography>
            <Typography variant="caption">
              <IconButton aria-label="comments">
                <ChatBubbleOutlineIcon />
                <span> {comments.length}</span>
              </IconButton>
            </Typography>
            <Typography variant="caption">
              <IconButton aria-label="view">
                <VisibilityOutlinedIcon />
                <span> {countOfVisitors}</span>
              </IconButton>
            </Typography>
          </Box>
          <Typography variant="caption">
            {createdAt && new Date(createdAt).toLocaleDateString("tr-TR")}
          </Typography>
        </Box>
      </SyledCard>
    </Grid>
  );
}
