"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PlanPage() {
  const [country, setCountry] = useState("")
  const [cgpa, setCgpa] = useState("")
  const [budget, setBudget] = useState("")

  const router = useRouter()

  function handleGenerate() {
    router.push("/dashboard")   // ⭐ GO TO DASHBOARD
  }

  return (
    <main
      style={{
        fontFamily: "inherit",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #1e3a8a 50%, #312e81 100%)",
        color: "white",
        padding: "80px 40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* FORM CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          padding: "48px",
          borderRadius: "22px",
          width: "620px",
          boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Student Profile Intake
        </h1>

        <p style={{ opacity: 0.85, marginBottom: "30px" }}>
          Provide your academic details to generate insights.
        </p>

        {/* COUNTRY */}
        <label style={{ fontWeight: "bold" }}>Preferred Country</label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="e.g. USA"
          style={input}
        />

        {/* CGPA */}
        <label style={{ fontWeight: "bold" }}>CGPA</label>
        <input
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="e.g. 8.2"
          style={input}
        />

        {/* BUDGET */}
        <label style={{ fontWeight: "bold" }}>Budget (USD)</label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. 40000"
          style={inputLast}
        />

        {/* ⭐ BUTTON NOW WORKS */}
        <button
          onClick={handleGenerate}
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Generate My Plan →
        </button>
      </div>
    </main>
  )
}


// INPUT STYLES

const input: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.4)",
  background: "rgba(0,0,0,0.3)",
  color: "white",
}

const inputLast: React.CSSProperties = {
  ...input,
  marginBottom: "30px",
}