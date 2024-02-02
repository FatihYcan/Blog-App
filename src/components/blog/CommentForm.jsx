import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const { postComments, getDetails } = useBlogCalls();

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
    await postComments("comments", data);
    getDetails({ id: _id });
    setData({
      blogId: _id,
      comment: "",
    });
  };

  console.log(data);

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
          placeholder="Add a comment"
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <Button variant="contained" type="submit">
          Add Comment
        </Button>
      </Box>
    </form>
  );
};

export default CommentForm;
