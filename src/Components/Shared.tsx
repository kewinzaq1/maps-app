import { styled } from "@mui/material/styles";
import { Input as muiInput } from "@mui/material";
import { green400 } from "material-ui/styles/colors";

export const Input = styled(muiInput)({
  "&::after": {
    borderColor: green400,
  },
});
