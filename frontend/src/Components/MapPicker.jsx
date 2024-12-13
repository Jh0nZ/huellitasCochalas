import React from "react";
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
