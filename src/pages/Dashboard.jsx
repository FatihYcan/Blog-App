import * as React from "react";
import Container from "@mui/material/Container";
import MainContent from "./MainContent";

const Dashboard = () => {
  return (
    <Container
      maxWidth="xl"
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginBottom: 2,
      }}
    >
      <MainContent />
    </Container>
  );
};

export default Dashboard;
