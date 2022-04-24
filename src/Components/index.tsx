import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { libraries, useSessionStorageState } from "../Utils";

interface MapModel {
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

const MapContext = createContext<MapModel | null>(null);

interface MapProviderModel {
  children: JSX.Element;
}

export const MapProvider = ({ children }: MapProviderModel) => {
  const [status, setStatus] = useState("idle");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0);
  const [error, setError] = useState<Error>();
  const [history, setHistory] = useSessionStorageState({
    name: "history",
    initialValue: [],
    removeAfterRefresh: true,
  });

  const isSuccess = status === "success";
  const isError = status === "error";
  const isIdle = status === "idle";
  const isPending = status === "pending";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "maps",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
    libraries,
    language: "en",
    region: "Europe",
  });

  const props = {
    status,
    isSuccess,
    isError,
    isIdle,
    isPending,
    isLoaded,
    loadError,
    error,
    setError,
    setStatus,
    origin,
    setOrigin,
    destination,
    setDestination,
    distance,
    setDistance,
    history,
    setHistory,
  };

  return <MapContext.Provider value={props}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap() used only within MapProvider");
  }
  return context;
};
