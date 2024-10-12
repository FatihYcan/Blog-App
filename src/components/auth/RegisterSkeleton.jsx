import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const SignInSkeletonContainer = styled(Stack)(({ theme }) => ({
  minHeight: "87vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const CardSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));
const RegisterSkeleton = () => {
  return (
    <SignInSkeletonContainer direction="column" justifyContent="space-between">
      <CardSkeleton>
        <Skeleton variant="text" width="60%" height={40} />
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={56} />
        </Box>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton
          variant="text"
          width="30%"
          height={20}
          sx={{ marginTop: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Skeleton variant="rectangular" height={48} />
        </Box>
      </CardSkeleton>
    </SignInSkeletonContainer>
  );
};

export default RegisterSkeleton;
