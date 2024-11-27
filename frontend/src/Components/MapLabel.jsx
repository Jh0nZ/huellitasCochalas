import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";

const MapLabel = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDCYcs33USDZVD_xS4F0CAFVI1-kwerco4",
    });

    if (!isLoaded) {
        return <div>Cargando mapa...</div>;
    }

    return (
        <Box
            style={{
                width: "100%",
                height: "200px",
            }}
        >
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}
                center={location}
                zoom={16}
                options={{
                    disableDefaultUI: true, // Deshabilita controles como zoom y street view
                }}
            >
                <Marker position={location} />
            </GoogleMap>
        </Box>
    );
};

export default MapLabel;
