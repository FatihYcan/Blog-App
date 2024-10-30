import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Button, Container, List } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import CommentCard from "../components/blog/CommentCard";
import CommentForm from "../components/blog/CommentForm";
import UpdateModal from "../components/blog/UpdateModal";
import DeleteModal from "../components/blog/DeleteModal";
import { styled } from "@mui/material/styles";

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

export default function Detail() {
  const { _id } = useParams();
  const { details } = useSelector((state) => state.blog);
  const { userId, username } = useSelector((state) => state.auth);
  const { getDetails, postLikes } = useBlogCalls();
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const [editingCommentId, setEditingCommentId] = React.useState(null);

  const handleOpen = () => {
    setData({
      title: details.title,
      image: details.image,
      categoryId: details.categoryId._id,
      isPublish: details.isPublish,
      content: details.content,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const { title, content, image, likes, comments, countOfVisitors } = details;

  const [data, setData] = React.useState({
    title: details.title,
    image: details.image,
    categoryId: details.categoryId,
    isPublish: details.isPublish,
    content: details.content,
  });

  React.useEffect(() => {
    getDetails({ id: _id });
    const img = new Image();
    img.src = details.image;

    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [details.image]);

  const name = details.userId ? details.userId.username : "";
  const isTallImage = imageSize.height * 1.5 > imageSize.width;
  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const categoryName = details.categoryId ? details.categoryId.name : "";

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setData({ comment: commentText });
  };

  const handleDeleteComment = (commentId) => {
    setEditingCommentId(commentId);
    setDeleteOpen(true);
  };

  const handleLike = () => {
    if (userId) {
      postLikes("blogs", _id);
      getDetails({ id: _id });
    } else {
      navigate("/login");
    }
  };

  return (
    <Container
      maxWidth="100%"
      component="main"
      sx={{
        minHeight: "90vh",
        marginBottom: "1.5rem",
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          margin: "auto",
          minHeight: "90vh",
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          image={image}
          sx={{
            "@media (min-width:600px)": {
              objectFit: isTallImage ? "contain" : "cover",
              height: "375px",
            },
            marginTop: "1rem",
          }}
        />

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {formattedName.charAt(0)}
            </Avatar>
          }
          title={name}
          subheader={
            details.createdAt && new Date(details.createdAt).toLocaleString()
          }
        />

        <SyledCardContent>
          <Typography variant="body2" color="text.secondary">
            {categoryName}
          </Typography>
        </SyledCardContent>

        <CardContent>
          <Typography component="h1" variant="body1">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            {likes?.includes(userId) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteIcon />
            )}
            <span> {likes?.length || 0} </span>
          </IconButton>
          <IconButton aria-label="comments" onClick={() => setShow(!show)}>
            <ChatBubbleOutlineIcon />
            <span> {comments?.length || 0}</span>
          </IconButton>
          <IconButton aria-label="view">
            <VisibilityOutlinedIcon />
            <span> {countOfVisitors}</span>
          </IconButton>
        </CardActions>
        {name === username && (
          <Box my={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "blue" }}
              onClick={handleOpen}
            >
              Update Blog
            </Button>

            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ marginLeft: "1rem" }}
              onClick={handleDeleteOpen}
            >
              Delete Blog
            </Button>
          </Box>
        )}

        {show && (
          <>
            <CommentForm
              editingComment={
                comments.find((comment) => comment._id === editingCommentId)
                  ?.comment
              }
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
            />
            <Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {comments?.map((item) => (
                  <CommentCard
                    key={item._id}
                    {...item}
                    onEdit={() => handleEditComment(item._id, item.comment)}
                    onClick={() => handleDeleteComment(item._id)}
                  />
                ))}
              </List>
            </Box>
          </>
        )}
        <UpdateModal
          open={open}
          handleClose={handleClose}
          data={data}
          setData={setData}
        />

        <DeleteModal
          open={deleteOpen}
          handleClose={() => setDeleteOpen(false)}
          editingCommentId={editingCommentId}
        />
      </Box>
    </Container>
  );
}
