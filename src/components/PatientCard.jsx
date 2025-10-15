import React from "react";
import { motion } from "framer-motion";
import formatTanggal from "../utils/formatTanggal";

export default function PatientCard({
  refProp,
  nama,
  ttl,
  kelas,
  rumahSakit,
  tanggalPembuatan,
  masaBerlaku,
}) {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <motion.div
        ref={refProp}
        style={{
          position: "relative",
          width: "384px",
          height: "240px",
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          padding: "16px 22px 22px 22px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          color: "white",
          fontFamily: "'Poppins', 'Roboto Condensed', monospace",
          letterSpacing: "0.3px",
          background: "linear-gradient(135deg, #0d9488, #064e3b)",
        }}
      >
        {/* Watermark */}
        <img
          src="/image.png"
          alt="Watermark"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "140px",
            height: "auto",
            opacity: 0.15,
            filter: "brightness(1.3)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Konten */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header */}
          <p
            style={{
              fontSize: "24px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "10px",
              marginTop: "0",
              textAlign: "center",
              color: "#f1f5f9",
            }}
          >
            Asuransi Kesehatan
          </p>

          {/* Data utama */}
          <div style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "11px", opacity: 0.7 }}>Nama</p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    textTransform: "uppercase",
                    color: "#e2e8f0",
                  }}
                >
                  {nama || "NAMA LENGKAP"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", opacity: 0.7 }}>Tgl. Lahir</p>
                <p style={{ fontSize: "13px", fontWeight: "500" }}>
                  {formatTanggal(ttl) || "01 September 2025"}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <div>
                <p style={{ fontSize: "11px", opacity: 0.7 }}>Instansi</p>
                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                  {kelas || "(isi sesuai instansi)"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", opacity: 0.7 }}>Rumah Sakit</p>
                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                  {rumahSakit || "KISAH TANAH AIR"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: "11px",
              opacity: 0.85,
              borderTop: "1px solid rgba(255,255,255,0.25)",
              marginTop: "auto",
              paddingTop: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0 }}>Tanggal Pembuatan</p>
                <p style={{ fontSize: "13px", fontWeight: "500" }}>
                  {formatTanggal(tanggalPembuatan) || "01 September 2025"}
                </p>
              </div>
              <div>
                <p style={{ margin: 0 }}>Masa Berlaku</p>
                <p style={{ fontSize: "13px", fontWeight: "500" }}>
                  {masaBerlaku || "15 September 2025"}
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: "9px",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: "8px",
                color: "#d1d5db",
              }}
            >
              *Tidak berlaku di area terjal & keadaan tenggelam
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
