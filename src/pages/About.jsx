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
import { Helmet } from "react-helmet";

const StyledLinkedInIcon = styled(LinkedInIcon)({
  fontSize: "2.5rem",
  color: "black",
  "&:hover": {
    color: "blue",
  },
});

export default function About() {
  return (
    <Box sx={{ minHeight: "84vh" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog App - About</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
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
              href="https://www.linkedin.com/in/fatih-yakutcan/"
              target="_blank"
            >
              <StyledLinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/FatihYcan"
              target="_blank"
            >
              <GitHubIcon style={{ fontSize: "2.5rem", color: "black" }} />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
