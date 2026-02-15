"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapPage() {

  // DEMO MARKERS (we can connect CSV later safely)
  const universities = [
    { name: "University of Toronto", lat: 43.6629, lng: -79.3957 },
    { name: "TU Munich", lat: 48.262, lng: 11.667 },
    { name: "MIT", lat: 42.3601, lng: -71.0942 }
  ]

  return (
    <main style={{ height: "100vh" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {universities.map((u, i) => (
          <Marker key={i} position={[u.lat, u.lng]}>
            <Popup>{u.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  )
}