import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define a custom icon
const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34], // Adjusts the position of the popup relative to the marker
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
});

const Map = ({ markers }) => {
    useEffect(() => {
        const map = L.map("map").setView([0, 0], 2); // World view by default

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        markers.forEach((marker) => {
            if (marker.lat && marker.lng) {
                L.marker([marker.lat, marker.lng], { icon: customIcon })
                    .addTo(map)
                    .bindPopup(`<b>${marker.label}</b>`, { className: "custom-popup" })
                    .openPopup();
            }
        });

        return () => map.remove();
    }, [markers]);

    return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default Map;
