import Link from "next/link"

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "inherit",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)",
        color: "white",
      }}
    >
      {/* SPACE GLOW BACKGROUNDS */}
      <div style={glowTop} />
      <div style={glowBottom} />

      {/* NAVBAR */}
      <div style={navbar}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/gradintel-logo.png" alt="GradIntel Logo" height="18" />
          <h2 style={{ margin: 0 }}>GradIntel</h2>
        </div>

        {/* ⭐ MODIFIED LINKS */}
        <div>
          {/* LOGIN → ACCESS PORTAL */}
          <Link href="/login" style={{ marginRight: "28px", color: "white" }}>
            Login
          </Link>

          {/* ACCESS PORTAL → AUTH LOGIN PAGE */}
          <Link href="/auth-login" style={{ color: "white" }}>
            Access Portal
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div style={hero}>
        {/* LEFT TEXT */}
        <div style={{ maxWidth: "620px" }}>
          <h1 style={heroTitle}>
            Plan Abroad.
            <br />
            Intelligently.
          </h1>

          <p style={heroSubtitle}>
            AI-driven overseas education planning for Indian engineering
            students.
          </p>

          {/* ⭐ HERO BUTTON → ACCESS PORTAL */}
          <Link href="/login">
            <button style={heroButton}>
              → Enter GradIntel
            </button>
          </Link>
        </div>

        {/* RIGHT GLASS PANEL */}
        <div style={panel}>
          <h2 style={{ marginBottom: "10px" }}>
            Access Your Planning Console
          </h2>

          <p style={{ opacity: 0.9 }}>
            Student and counselor portals for intelligent decision-making.
          </p>

          {/* ⭐ PANEL BUTTON → AUTH LOGIN */}
          <Link href="/auth-login">
            <button style={panelButton}>
              Go to Access Portal →
            </button>
          </Link>
        </div>
      </div>

      {/* FEATURE STRIP */}
      <div style={features}>
        <div>🧠 AI Recommendations</div>
        <div>📊 ROI & Career Insights</div>
        <div>🌍 Global Opportunity Mapping</div>
      </div>
    </main>
  )
}


// STYLES

const navbar: React.CSSProperties = {
  padding: "24px 60px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const hero: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "90px 60px",
}

const heroTitle: React.CSSProperties = {
  fontSize: "64px",
  lineHeight: "1.05",
  marginBottom: "22px",
}

const heroSubtitle: React.CSSProperties = {
  fontSize: "20px",
  opacity: 0.9,
  marginBottom: "42px",
}

const heroButton: React.CSSProperties = {
  padding: "18px 36px",
  backgroundColor: "white",
  color: "#1e3a8a",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
}

const panel: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px)",
  padding: "44px",
  borderRadius: "20px",
  width: "380px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
}

const panelButton: React.CSSProperties = {
  marginTop: "26px",
  width: "100%",
  padding: "16px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer",
}

const features: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.08)",
  padding: "44px 60px",
  display: "flex",
  justifyContent: "space-around",
  fontSize: "18px",
}

const glowTop: React.CSSProperties = {
  position: "absolute",
  top: "-150px",
  right: "-200px",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(59,130,246,0.45), transparent)",
  borderRadius: "50%",
  filter: "blur(90px)",
}

const glowBottom: React.CSSProperties = {
  position: "absolute",
  bottom: "-220px",
  left: "-220px",
  width: "650px",
  height: "650px",
  background:
    "radial-gradient(circle, rgba(37,99,235,0.5), transparent)",
  borderRadius: "50%",
  filter: "blur(100px)",
}