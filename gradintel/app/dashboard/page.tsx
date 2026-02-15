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

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/gradintel-logo.png"
            alt="GradIntel Logo"
            style={{ height: "36px" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "22px" }}>
            GradIntel
          </span>
        </div>

        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          <Link href="/dashboard" style={navLink}>👤 User Info</Link>
          <Link href="/map" style={navLink}>🌍 Map Analysis</Link>
          <Link href="/universities" style={navLink}>🎓 Universities</Link>
          <button style={chatButton}>🤖 GradIntel AI</button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={layout}>

        {/* LEFT COLUMN */}
        <div style={leftColumn}>

          {/* ⭐ STUDENT INFO FROM ML */}
          <div style={card}>
            <h3 style={title}>👤 Student Info</h3>
            <p>Name: {data.student.name}</p>
            <p>CGPA: {data.student.cgpa}</p>
            <p>IELTS: {data.student.ielts}</p>
            <p>Budget: ${data.student.budget}</p>
            <p>Target: {data.student.country}</p>
          </div>

          {/* ⭐ ACTIONS FROM ML */}
          <div style={card}>
            <h3 style={title}>🧠 Recommended Actions</h3>
            {data.suggestions.map((s: string, i: number) => (
              <p key={i}>{s}</p>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={rightColumn}>

          {/* ⭐ UNIVERSITIES FROM ML */}
          <div style={card}>
            <h3 style={title}>🎓 Recommended Universities</h3>
            {data.universities.map((u: string, i: number) => (
              <p key={i}>{u}</p>
            ))}
          </div>

          {/* ⭐ INSIGHTS FROM ML */}
          <div style={card}>
            <h3 style={title}>📊 AI Insights</h3>
            <p>Admission Chance: {data.insights.admissionChance}</p>
            <p>ROI: {data.insights.roi}</p>
            <p>Visa Difficulty: {data.insights.visaDifficulty}</p>
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
  padding: "16px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const navLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: 500
}

const chatButton: React.CSSProperties = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
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