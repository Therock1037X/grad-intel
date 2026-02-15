"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardPage() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/predict")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) {
    return <div style={{ padding: 40 }}>Loading AI insights...</div>
  }

  return (
    <main style={{ background: "#eef2f7", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={header}>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          🎓 GradIntel
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
    👤 User Info
  </Link>
          <Link href="/map" style={{ color: "white", textDecoration: "none" }}>
    🌍 Map Analysis
  </Link>
          <Link href="/universities" style={{ color: "white", textDecoration: "none" }}>
    🎓 Universities
  </Link>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={layout}>

        {/* LEFT COLUMN */}
        <div style={leftColumn}>

          {/* STUDENT INFO */}
          <div style={card}>
            <h3 style={title}>👤 Student Info</h3>
            <p>CGPA: 8.2</p>
            <p>IELTS: 6.5</p>
            <p>Budget: $40,000</p>
          </div>

          {/* AI ACTIONS */}
          <div style={card}>
            <h3 style={title}>🧠 Recommended Actions</h3>
            {data.suggestions.map((s: string, i: number) => (
              <p key={i}>{s}</p>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={rightColumn}>

          {/* UNIVERSITIES */}
          <div style={card}>
            <h3 style={title}>🎓 Recommended Universities</h3>
            <p>University of Toronto</p>
            <p>University of Melbourne</p>
            <p>TU Munich</p>
          </div>

          {/* AI INSIGHTS */}
          <div style={card}>
            <h3 style={title}>📊 AI Insights</h3>
            <p>Admission Chance: {data.admissionChance}</p>
            <p>ROI: {data.roi}</p>
            <p>Visa Difficulty: {data.visaDifficulty}</p>
          </div>

        </div>

      </div>
    </main>
  )
}


// STYLES

const header: React.CSSProperties = {
  background: "linear-gradient(135deg, #1e3a8a, #312e81)",
  color: "white",
  padding: "18px 40px",
  display: "flex",
  justifyContent: "space-between"
}

const layout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "24px",
  padding: "24px"
}

const leftColumn: React.CSSProperties = {
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gap: "24px"
}

const rightColumn: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px"
}

const card: React.CSSProperties = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  color: "black"
}

const title: React.CSSProperties = {
  marginBottom: "12px",
  fontWeight: "bold"
}