"use client"

import { useState } from "react"

export default function ChatPage() {

  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello 👋 I'm GradIntel AI. Ask me anything." }
  ])

  const [input, setInput] = useState("")

  async function sendMessage() {

    if (!input.trim()) return

    const userText = input
    setInput("")

    // Add user message
    setMessages(prev => [...prev, { from: "user", text: userText }])

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      })

      const data = await res.json()

      // Add AI reply
      setMessages(prev => [...prev, { from: "ai", text: data.reply }])

    } catch {
      setMessages(prev => [...prev, { from: "ai", text: "Server not responding." }])
    }
  }

  // ⭐ SEND ON ENTER
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <main style={container}>

      <h1 style={{ marginBottom: 20 }}>🤖 GradIntel AI Assistant</h1>

      {/* CHAT BOX */}
      <div style={chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "user" ? "right" : "left",
              marginBottom: 12
            }}
          >
            <span
              style={{
                background: m.from === "user" ? "#2563eb" : "#e5e7eb",
                color: m.from === "user" ? "white" : "black",
                padding: "10px 14px",
                borderRadius: "12px",
                display: "inline-block"
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask GradIntel AI..."
          style={inputStyle}
        />

        <button onClick={sendMessage} style={button}>
          Send
        </button>
      </div>

    </main>
  )
}

const container = {
  minHeight: "100vh",
  background: "#eef2f7",
  padding: "40px"
}

const chatBox = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  height: "60vh",
  overflowY: "auto",
  marginBottom: "20px"
}

const inputStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  color: "black"
}

const button = {
  padding: "12px 20px",
  background: "#1e3a8a",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
}