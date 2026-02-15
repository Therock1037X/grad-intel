"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AuthLoginPage() {

  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    if (userId && password) {
      localStorage.setItem("loggedIn", "true")
      router.push("/login")   // ⭐ CHANGED — GO TO ACCESS PORTAL
    } else {
      alert("Enter User ID and Password")
    }
  }

  return (
    <main style={container}>
      <div style={card}>
        <h1 style={title}>🔐 GradIntel Login</h1>

        <form onSubmit={handleLogin} style={form}>

          <input
            placeholder="User ID"
            style={input}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={button}>
            Login
          </button>

        </form>
      </div>
    </main>
  )
}


// ⭐ STYLES

const container: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#020617,#1e3a8a,#312e81)"
}

const card: React.CSSProperties = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  width: "360px",
  textAlign: "center",
  color: "black"
}

const title: React.CSSProperties = {
  marginBottom: "24px"
}

const form: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px"
}

const input: React.CSSProperties = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  color: "black"
}

const button: React.CSSProperties = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#1e3a8a",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
}