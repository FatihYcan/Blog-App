import React from "react";
import { Typography, Skeleton, Card } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Card elevation={24} sx={{ margin: "10px" }}>
      <Typography
        variant="body1"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "150px",
        }}
      >
        <Skeleton
          variant="rectangular"
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
          <Skeleton />
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
          <Skeleton />
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="span"
          sx={{ textAlign: "left", margin: "16px" }}
        >
          <Skeleton />
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
          <Skeleton width={30} height={30} />
          <Skeleton width={30} height={30} />
          <Skeleton width={30} height={30} />
        </Typography>
        <Skeleton variant="rectangular" width={120} height={40} />
      </Typography>
    </Card>
  );
};

export default SkeletonCard;
