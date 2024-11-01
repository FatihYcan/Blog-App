import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

export default function CommentCard({
  comment,
  createdAt,
  userId,
  onEdit,
  onClick,
}) {
  const { username } = useSelector((state) => state.auth);

  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [weekday, day, month, year] = formattedDate.split(" ");

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={userId.username}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {`${weekday} ${day} ${month} ${year}`}
              </Typography>
              <br />
              <Typography component="span" color="text.primary">
                {comment}
              </Typography>
            </>
          }
        />
        {userId.username === username && (
          <ListItemSecondaryAction>
            <EditIcon
              color="primary"
              onClick={() => onEdit(comment)}
              sx={{ cursor: "pointer" }}
            />
            <DeleteIcon
              color="error"
              onClick={onClick}
              sx={{ cursor: "pointer" }}
            />
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
}
