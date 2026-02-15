"use client"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {

  const [hoverStudent, setHoverStudent] = useState(false)
  const [hoverCounselor, setHoverCounselor] = useState(false)

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
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* TITLE */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "52px", marginBottom: "12px" }}>
          Access Portal
        </h1>
        <p style={{ opacity: 0.85 }}>
          Choose your console to continue
        </p>
      </div>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "40px" }}>

        {/* STUDENT */}
        <div style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          padding: "40px",
          borderRadius: "20px",
          width: "340px",
          textAlign: "center"
        }}>
          <h2>🎓 Student Console</h2>

          <Link href="/plan">
            <button
              onMouseEnter={() => setHoverStudent(true)}
              onMouseLeave={() => setHoverStudent(false)}
              style={{
                marginTop: "26px",
                width: "100%",
                padding: "16px",
                backgroundColor: hoverStudent ? "#60a5fa" : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "17px",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              Enter as Student →
            </button>
          </Link>
        </div>

        {/* COUNSELOR */}
        <div style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(18px)",
          padding: "40px",
          borderRadius: "20px",
          width: "340px",
          textAlign: "center"
        }}>
          <h2>👨‍🏫 Counselor Console</h2>

          <button
            onMouseEnter={() => setHoverCounselor(true)}
            onMouseLeave={() => setHoverCounselor(false)}
            style={{
              marginTop: "26px",
              width: "100%",
              padding: "16px",
              backgroundColor: hoverCounselor ? "#3b82f6" : "#1e3a8a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "17px",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >
            Enter as Counselor →
          </button>
        </div>

      </div>
    </main>
  )
}