import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Box } from "@mui/material";

const center = {
    lat: -17.3822,
    lng: -66.151795,
};

const MapPicker = ({ style, markerPosition, setMarkerPosition }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDCYcs33USDZVD_xS4F0CAFVI1-kwerco4",
    });

    if (!isLoaded) {
        return <div>Cargando...</div>;
    }

    return (
        <Box style={style}>
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}
                center={markerPosition ? center : markerPosition}
                zoom={16}
                onClick={(event) => {
                    const { lat, lng } = event.latLng.toJSON();
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode(
                        { location: { lat, lng } },
                        (results, status) => {
                            if (status === "OK" && results[0]) {
                                console.log(
                                    "results",
                                    results[0].formatted_address
                                );
                            } else {
                                console.error(
                                    "No se pudo obtener la dirección:",
                                    status
                                );
                            }
                        }
                    );
                    setMarkerPosition({
                        lat: lat,
                        lng: lng,
                    });
                }}
            >
                {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
        </Box>
    );
};

export default MapPicker;
