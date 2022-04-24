import { Dispatch, SetStateAction } from "react";

export interface HistoryModel {
  origin: string;
  destination: string;
}

export interface MapModel {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  origin: string;
  setOrigin: Dispatch<SetStateAction<string>>;
  error?: Error;
  setError: Dispatch<SetStateAction<Error | undefined>>;
  destination: string;
  setDestination: Dispatch<SetStateAction<string>>;
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
  history: any;
  setHistory: any;
  loadError?: Error;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isLoaded: boolean;
}

export interface ChildrenModel {
  children: JSX.Element;
}

export interface CalculateCost {
  distance: number;
  costPerKm: number;
}

export interface SessionStorageState {
  name: string;
  initialValue?: unknown;
  removeAfterRefresh?: boolean;
}
