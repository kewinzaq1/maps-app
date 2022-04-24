import { CircularProgress, Box, Input as muiInput } from "@mui/material";
import { green400, green600 } from "material-ui/styles/colors";
import { styled } from "@material-ui/core";

export const Input = styled(muiInput)({
  "&::after": {
    borderColor: green400,
  },
});

export const Progress = () => (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress
      sx={{
        color: green600,
      }}
    />
  </Box>
);
