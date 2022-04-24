import { styled } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MapProvider } from "../Components";
import { render as rtlRender } from "@testing-library/react";
import { CalculateCost, SessionStorageState } from "./Models";

export const libraries: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["drawing", "places"];

export const Progress = styled(CircularProgress)({
  margin: "0 auto",
});

export const calculateCost = ({ distance, costPerKm }: CalculateCost) => {
  const kilometersCost = distance * costPerKm;
  const fixedCost = kilometersCost * 1.1;
  const daysCost = Math.ceil(distance / 800) * 1000;

  return Math.round(fixedCost + daysCost);
};

export const useSessionStorageState = ({
  name,
  initialValue,
  removeAfterRefresh,
}: SessionStorageState) => {
  const valueFromSessionStorage = sessionStorage.getItem(name);

  const [state, setState] = useState<typeof initialValue>(
    valueFromSessionStorage ? JSON.parse(valueFromSessionStorage) : initialValue
  );

  useEffect(() => {
    if (removeAfterRefresh) {
      window.onbeforeunload = () => {
        sessionStorage.removeItem(name);
      };
    }
    sessionStorage.setItem(name, JSON.stringify(state));
  }, [name, removeAfterRefresh, state]);

  return [state, setState];
};

export const render = (children: JSX.Element) =>
  rtlRender(
    <BrowserRouter>
      <MapProvider>{children}</MapProvider>
    </BrowserRouter>
  );
