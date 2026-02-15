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
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.45), transparent)",
          borderRadius: "50%",
          filter: "blur(90px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-220px",
          left: "-220px",
          width: "650px",
          height: "650px",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.5), transparent)",
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />

      {/* NAVBAR */}
      <div
        style={{
          padding: "24px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ letterSpacing: "1px" }}><div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img src="/gradintel-logo.png" alt="GradIntel Logo" height="18" />
  <h2 style={{ margin: 0 }}>GradIntel</h2>
</div> </h2>

        <div>
          <Link href="/login" style={{ marginRight: "28px", color: "white" }}>
            Login
          </Link>
          <Link href="/login" style={{ color: "white" }}>
            Access Portal
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "90px 60px",
        }}
      >
        {/* LEFT TEXT */}
        <div style={{ maxWidth: "620px" }}>
          <h1
            style={{
              fontSize: "64px",
              lineHeight: "1.05",
              marginBottom: "22px",
            }}
          >
            Plan Abroad.
            <br />
            Intelligently.
          </h1>

          <p
            style={{
              fontSize: "20px",
              opacity: 0.9,
              marginBottom: "42px",
            }}
          >
            AI-driven overseas education planning for Indian engineering
            students.
          </p>

          <Link href="/login">
            <button
              style={{
                padding: "18px 36px",
                backgroundColor: "white",
                color: "#1e3a8a",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              → Enter GradIntel
            </button>
          </Link>
        </div>

        {/* RIGHT GLASS PANEL */}
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(18px)",
            padding: "44px",
            borderRadius: "20px",
            width: "380px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            Access Your Planning Console
          </h2>

          <p style={{ opacity: 0.9 }}>
            Student and counselor portals for intelligent decision-making.
          </p>

          <Link href="/login">
            <button
              style={{
                marginTop: "26px",
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
              Go to Access Portal →
            </button>
          </Link>
        </div>
      </div>

      {/* FEATURE STRIP */}
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          padding: "44px 60px",
          display: "flex",
          justifyContent: "space-around",
          fontSize: "18px",
        }}
      >
        <div>🧠 AI Recommendations</div>
        <div>📊 ROI & Career Insights</div>
        <div>🌍 Global Opportunity Mapping</div>
      </div>
    </main>
  )
}