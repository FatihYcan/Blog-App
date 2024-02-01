import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import image from "../img/logo.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

const StyledLinkedInIcon = styled(LinkedInIcon)({
  fontSize: "2.5rem",
  color: "black",
  "&:hover": {
    color: "blue",
  },
});

const StyledYouTubeIcon = styled(YouTubeIcon)({
  fontSize: "2.5rem",
  color: "black",
  "&:hover": {
    color: "red",
  },
});

export default function About() {
  return (
    <Box sx={{ minHeight: "76vh" }}>
      <Card
        elevation={24}
        sx={{
          minWidth: "345px",
          maxWidth: "450px",
          height: "60vh",
          margin: "2rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={image} alt="Fatih YCAN" style={{ height: "200px" }} />
        <CardContent>
          <Typography variant="body1" component="div">
            <IconButton
              component="a"
              href="https://www.linkedin.com/"
              target="_blank"
            >
              <StyledLinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.github.com/"
              target="_blank"
            >
              <GitHubIcon style={{ fontSize: "2.5rem", color: "black" }} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.youtube.com/"
              target="_blank"
            >
              <StyledYouTubeIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
