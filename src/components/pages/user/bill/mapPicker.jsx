
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onSelect(lat, lng); // نبعث الإحداثيات للـ Bill.jsx
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function MapPicker({ onSelect, defaultCenter, defaultZoom }) {
  return (
    <div className="h-64 w-full overflow-hidden rounded-xl">
      <MapContainer
        center={defaultCenter || [36.2021, 37.1343]}
        zoom={defaultZoom || 12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker onSelect={onSelect} />
      </MapContainer>
    </div>
  );
}
