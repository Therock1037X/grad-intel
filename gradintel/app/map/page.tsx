"use client"

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapPage() {

  // 🌍 Admission success overlay data (demo — will come from ML later)
  const regions = [
    { name: "USA", lat: 37.0902, lng: -95.7129, success: 72 },
    { name: "Canada", lat: 56.1304, lng: -106.3468, success: 84 },
    { name: "Germany", lat: 51.1657, lng: 10.4515, success: 65 },
    { name: "Australia", lat: -25.2744, lng: 133.7751, success: 78 },
  ]

  // 🎨 Color logic based on success rate
  const getColor = (value: number) => {
    if (value >= 80) return "#22c55e"   // green
    if (value >= 70) return "#f59e0b"   // orange
    return "#ef4444"                    // red
  }

  return (
    <main style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 COLOR OVERLAY MARKERS */}
        {regions.map((region, index) => (
          <CircleMarker
            key={index}
            center={[region.lat, region.lng]}
            radius={28}
            pathOptions={{
              color: getColor(region.success),
              fillColor: getColor(region.success),
              fillOpacity: 0.45,
              weight: 2,
            }}
          >
            <Popup>
              <strong>{region.name}</strong>
              <br />
              Admission Success: {region.success}%
            </Popup>
          </CircleMarker>
        ))}

      </MapContainer>
    </main>
  )
}