import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: "GradIntel",
  description: "AI Career & Study Abroad Planner",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        
        {/* PAGE CONTENT */}
        {children}

      </body>
    </html>
  )
}


// STYLES
const navbar: React.CSSProperties = {
  background: "linear-gradient(135deg,#1e3a8a,#312e81)",
  color: "white",
  padding: "18px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}

const link: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500"
}