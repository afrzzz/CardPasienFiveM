import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        background: "linear-gradient(90deg,#0ea5e9,#6366f1)",
        color: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
          }}
        >
          KTA
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>KISAH TANAH AIR</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Rumah Sakit Umum</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: 8,
            background:
              location.pathname === "/"
                ? "rgba(255,255,255,0.12)"
                : "transparent",
          }}
        >
          Beranda
        </Link>

        <Link
          to="/askes"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: 8,
            background:
              location.pathname === "/askes"
                ? "rgba(255,255,255,0.12)"
                : "transparent",
          }}
        >
          Pembuatan Askes
        </Link>
      </div>
    </nav>
  );
}
