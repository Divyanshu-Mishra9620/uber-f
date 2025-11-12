import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to move map center when position updates
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);
  return null;
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState([28.61, 77.23]); // default Delhi

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
      });

      const watchId = navigator.geolocation.watchPosition((pos) => {
        setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
        console.log("Updated position:", pos.coords.latitude, pos.coords.longitude);
      });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);


  return (
  <div className="absolute inset-0 -z-10"> 
    <MapContainer
      center={currentPosition}
      zoom={15}
      className="h-full w-full"
    >
      {/* OpenStreetMap Free Tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User/Captain marker */}
      <Marker position={currentPosition}>
        <Popup>You are here</Popup>
      </Marker>

      <RecenterMap position={currentPosition} />
    </MapContainer>
  </div>
);

//   return (
//     <MapContainer
//       center={currentPosition}
//       zoom={15}
//       style={{ height: "90vh", width: "100%" }}
//     >
//       {/* OpenStreetMap Free Tiles */}
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* User/Captain marker */}
//       <Marker position={currentPosition}>
//         <Popup>You are here</Popup>
//       </Marker>

//       <RecenterMap position={currentPosition} />
//     </MapContainer>
//   );
};

export default LiveTracking;
