import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Box } from "@mui/material";

// Center coordinates (same as your example)
const center = {
    lat: -17.382213,
    lng: -66.151782,
};

// Fix for default Marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom component to handle click events and update marker position
const MapClickHandler = ({ setMarkerPosition }) => {
    useMapEvents({
        click(event) {
            console.log(event);
            
            setMarkerPosition(event.latlng);
        },
    });
    return null;
};

const OpenMapPicker = ({ style, markerPosition, setMarkerPosition }) => {
    return (
        <Box style={style}>
            <MapContainer
                center={markerPosition ? center : markerPosition}
                zoom={16}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler setMarkerPosition={setMarkerPosition} />
                {markerPosition && <Marker position={markerPosition} />}
            </MapContainer>
        </Box>
    );
};

export default OpenMapPicker;
