import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { Box } from "@mui/material";

// Fix for default Marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const OpenMapLabel = ({ location }) => {
    return (
        <Box style={{ width: "100%", height: "200px" }}>
            <MapContainer
                center={location}
                zoom={16}
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={false} // Deshabilita el zoom con la rueda del mouse
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={location} />
            </MapContainer>
        </Box>
    );
};

export default OpenMapLabel;
