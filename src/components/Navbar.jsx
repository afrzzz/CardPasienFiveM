import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/askes", label: "Pembuatan Askes" },
    { path: "/strukturpetinggi", label: "Struktur Petinggi" },
  ];

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 28px",
        background: "linear-gradient(90deg,#0ea5e9,#6366f1)",
        color: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          KTA
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>KISAH TANAH AIR</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Rumah Sakit Umum</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: 8,
              fontWeight: 500,
              transition: "background 0.25s, transform 0.25s",
              background:
                location.pathname === item.path
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                location.pathname === item.path
                  ? "rgba(255,255,255,0.2)"
                  : "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
