import React, { useRef } from "react";
import {
  Box,
  Button as muiButton,
  FormGroup,
  Typography,
  List,
} from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import { styled } from "@mui/material/styles";
import { useMap } from ".";
import { useNavigate } from "react-router-dom";
import {
  darkWhite,
  fullBlack,
  green200,
  green600,
  green800,
} from "material-ui/styles/colors";
import { Input } from "./Shared";
import { HistoryModel } from "../Utils/Models";

const Form = () => {
  const { setOrigin, setDestination, history, setHistory } = useMap();

  const navigate = useNavigate();

  const originRef = useRef<HTMLInputElement>();
  const destinationRef = useRef<HTMLInputElement>();

  const createHistory = (newTrip: Object) => {
    const historyCopy = [...history];
    historyCopy.push(newTrip);
    setHistory(historyCopy);
  };

  const setRoute = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (destinationRef.current?.value && originRef.current?.value) {
      setOrigin(originRef.current.value);
      setDestination(destinationRef.current.value);
      const historyElement: HistoryModel = {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
      };
      createHistory(historyElement);
    }
    navigate("map");
  };

  const moveToMap = (origin: string, destination: string) => {
    setOrigin(origin);
    setDestination(destination);
    navigate("map");
  };

  return (
    <Wrapper>
      <Box component={"header"}>
        <Typography variant={"h2"} component={"h1"}>
          Maps
        </Typography>
        <Typography variant={"subtitle1"} component={"h2"}>
          Select a route below to get the data you are interested in
        </Typography>
      </Box>
      <Box component="form" onSubmit={setRoute}>
        <FormGroup>
          <Autocomplete>
            <Input placeholder={"Input Origin"} inputRef={originRef} required />
          </Autocomplete>
          <Autocomplete className={"google-autocomplete"}>
            <Input
              placeholder={"Input Destination"}
              inputRef={destinationRef}
              required
            />
          </Autocomplete>
        </FormGroup>
        <FormGroup>
          <Button type={"submit"} variant={"outlined"}>
            Apply
          </Button>
        </FormGroup>
        {Boolean(history.length) && (
          <List
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",

              h3: {
                marginBottom: "1rem",
              },

              li: {
                listStyle: "none",
                marginBottom: "1rem",
                cursor: "pointer",

                p: {
                  span: {
                    fontWeight: 600,
                  },
                },
              },
            }}
          >
            <Typography variant={"h4"} component={"h3"}>
              {history.length === 1 ? "Last trip:" : "Last trips:"}
            </Typography>
            {history.map(
              ({ destination, origin }: HistoryModel, index: number) => (
                <li key={index} onClick={() => moveToMap(origin, destination)}>
                  <Typography variant={"subtitle1"} component={"p"}>
                    From <span>{origin}</span>
                  </Typography>{" "}
                  <Typography variant={"subtitle1"} component={"p"}>
                    To <span>{destination}</span>
                  </Typography>
                </li>
              )
            )}
          </List>
        )}
      </Box>
    </Wrapper>
  );
};
export default Form;

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  maxWidth: "900px",
  padding: "5rem 2rem",
  height: "80vh",

  header: {
    width: "100%",
  },

  form: {
    padding: "2rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    "div, input": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  },
});

const Button = styled(muiButton)({
  backgroundColor: green600,
  color: darkWhite,
  boxShadow: "none",
  borderColor: green200,
  "&:hover": {
    background: "transparent",
    color: fullBlack,
    borderColor: green800,
  },
});
