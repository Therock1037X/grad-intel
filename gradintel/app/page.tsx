"use client"

import { useState } from "react"

export default function PlanPage() {
  const [name, setName] = useState("")
  const [cgpa, setCgpa] = useState("")
  const [country, setCountry] = useState("")
  const [budget, setBudget] = useState("")

  function handleSubmit() {
    alert("Student data saved (temporary)")
  }

  return (
    <main style={{padding: "40px", fontFamily: "Arial"}}>
      <h1 style={{fontSize: "36px", color: "#1e3a8a"}}>
        Student Planning Form 🎓
      </h1>

      <div style={{marginTop: "30px"}}>
        <input
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          style={{display:"block", marginBottom:"10px", padding:"10px"}}
        />

        <input
          placeholder="CGPA"
          onChange={(e)=>setCgpa(e.target.value)}
          style={{display:"block", marginBottom:"10px", padding:"10px"}}
        />

        <input
          placeholder="Preferred Country"
          onChange={(e)=>setCountry(e.target.value)}
          style={{display:"block", marginBottom:"10px", padding:"10px"}}
        />

        <input
          placeholder="Budget INR"
          onChange={(e)=>setBudget(e.target.value)}
          style={{display:"block", marginBottom:"10px", padding:"10px"}}
        />

        <button
          onClick={handleSubmit}
          style={{
            marginTop:"20px",
            padding:"12px 20px",
            backgroundColor:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"8px",
            fontSize:"18px"
          }}
        >
          Submit
        </button>
      </div>
    </main>
  )
}