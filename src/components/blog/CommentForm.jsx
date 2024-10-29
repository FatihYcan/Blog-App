import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useParams } from "react-router-dom";

const CommentForm = ({
  editingCommentId,
  setEditingCommentId,
  editingComment,
}) => {
  const { postComments, getDetails, putComments } = useBlogCalls();

  const { _id } = useParams();
  const [data, setData] = React.useState({
    blogId: _id,
    comment: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingComment) {
      await putComments(editingCommentId, { comment: data.comment });
      setEditingCommentId(null);
    } else {
      await postComments("comments", data);
    }
    setData({
      blogId: _id,
      comment: "",
    });
    getDetails({ id: _id });
  };

  React.useEffect(() => {
    if (editingComment) {
      setData({ blogId: _id, comment: editingComment });
    } else {
      setData({ blogId: _id, comment: "" });
    }
  }, [editingComment, _id]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <TextField
          id="comment"
          label="Comment"
          name="comment"
          multiline
          rows={2}
          value={data.comment}
          onChange={handleChange}
          placeholder={editingComment ? "Update comment" : "Add a comment"}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <Button variant="contained" type="submit">
          {editingComment ? "Update Comment" : "Add Comment"}
        </Button>
      </Box>
    </form>
  );
};

export default CommentForm;
