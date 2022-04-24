import {useEffect, useMemo, useState} from "react";
import {GoogleMap, DirectionsRenderer} from "@react-google-maps/api";
import {useMap} from ".";
import {Alert, Box, Typography, IconButton} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {calculateCost, Progress} from "../Utils";
import {useNavigate} from "react-router-dom";
import {Input} from "./Shared";
import {jsPDF} from "jspdf";
import {darkWhite, green600, white} from "material-ui/styles/colors";


const Map = () => {
    const {
        setStatus,
        origin,
        setDistance,
        destination,
        isError,
        setError,
        error,
        isLoaded,
        loadError,
        distance,
    } = useMap();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setMap] = useState<google.maps.Map>();
    const [costPerKm, setCostPerKm] = useState(5);
    const navigate = useNavigate();
    const [directionResponse, setDirectionResponse] =
        useState<google.maps.DirectionsResult>();
    const [cost, setCost] = useState(0);

    const printResults = () => {
        const doc = new jsPDF();
        doc.text(
            `
      ·origin: ${origin}
      ·destination: ${destination}
      ·distance: ${distance} Kilometers
      ·cost per km: ${costPerKm} PLN
      ·total cost: ${cost} PLN
      `,
            10,
            10
        );
        doc.save("travel-info.pdf");
    };

    useEffect(() => {
        if (origin && destination) {
            const directionService = new google.maps.DirectionsService();
            directionService
                .route({
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then((results) => {
                    setDirectionResponse(results);
                    setStatus("success");
                    const distance = results?.routes[0]?.legs[0]?.distance?.value;
                    if (typeof distance === "number") {
                        setDistance(distance / 1000); // convert to kilometers
                    }
                })
                .catch((error) => {
                    setError(error);
                    setStatus("error");
                });
        }
    }, [destination, origin, setDistance, setError, setStatus]);

    useMemo(() => {
        return distance && setCost(calculateCost({distance, costPerKm}));
    }, [distance, costPerKm]);

    useEffect(() => {
        if (!directionResponse && !origin && !destination) {
            navigate("/");
        }
    }, [destination, directionResponse, navigate, origin]);

    if (loadError && isError) {
        return <Alert color={"error"}>{error?.message}</Alert>;
    }

    if (!isLoaded && !directionResponse) {
        return <Progress/>;
    }

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            <GoogleMap
                zoom={15}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    draggable: false,
                }}
                onLoad={(map) => setMap(map)}
                onUnmount={() => {
                    setMap(undefined);
                    setDirectionResponse(undefined);
                }}
            >
                {directionResponse && (
                    <DirectionsRenderer directions={directionResponse}/>
                )}
            </GoogleMap>
            <Box
                sx={{
                    maxWidth: "800px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem 2rem",
                    boxSizing: 'border-box',
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: white,
                        position: "relative",
                        zIndex: 9999,
                        padding: "1rem",
                        borderRadius: ".5rem",
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            width: "20%",
                        }}
                    >
                        <Typography variant={"subtitle1"} component={"p"}>
                            Cost per km (PLN)
                        </Typography>
                        <Input
                            inputProps={{min: 1}}
                            value={costPerKm}
                            onChange={({target: {value: cost}}) =>
                                setCostPerKm(Number(cost))
                            }
                            type={"number"}
                        />{" "}
                    </Box>
                    <Box>
                        <Typography variant={"subtitle1"} component={"p"}>
                            Cost
                        </Typography>{" "}
                        <Typography variant={"subtitle2"} component={"p"}>
                            {cost} <span>PLN</span>
                        </Typography>
                    </Box>{" "}
                    <Box>
                        <Typography variant={"subtitle1"} component={"p"}>
                            Distance{" "}
                        </Typography>{" "}
                        <Typography variant={"subtitle2"} component={"p"}>
                            {distance} <span>KM</span>
                        </Typography>
                    </Box> <Box>
                    <Typography variant={"subtitle1"} component={"p"}>
                        Origin{" "}
                    </Typography>{" "}
                    <Typography variant={"subtitle2"} component={"p"}>
                        {origin}
                    </Typography>
                </Box> <Box>
                    <Typography variant={"subtitle1"} component={"p"}>
                        Destination{" "}
                    </Typography>{" "}
                    <Typography variant={"subtitle2"} component={"p"}>
                        {destination}
                    </Typography>
                </Box>
                </Box>
            </Box>
            <IconButton
                sx={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "2rem",
                    zIndex: "99999",
                    background: white,
                    borderRadius: "50%",
                    padding: "1rem",
                    "&:hover": {
                        backgroundColor: green600,
                        color: darkWhite,
                    },
                }}
                aria-label={"save results as pdf"}
                onClick={printResults}
            >
                <SaveIcon/>
            </IconButton>
        </Box>
    );
};

export default Map;
