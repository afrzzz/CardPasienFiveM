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
        backgroundColor: "#064e3b",
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
          borderRadius: "16px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
          padding: "12px 20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          color: "white",
          fontFamily: "'Roboto Condensed', 'OCR A Std', monospace",
          letterSpacing: "0.4px",
          background: "linear-gradient(135deg, #10b981, #065f46)",
        }}
      >
        <img
          src="/image.png"
          alt="Watermark"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150px",
            height: "auto",
            opacity: 0.5,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <p
            style={{
              fontSize: "26px",
              fontWeight: "800",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "8px",
              marginTop: "0",
              textAlign: "center",
            }}
          >
            Asuransi Kesehatan
          </p>

          <div style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: "11px", opacity: 0.75 }}>Nama</p>
                <p
                  style={{
                    fontWeight: "700",
                    fontSize: "16px",
                    textTransform: "uppercase",
                  }}
                >
                  {nama || "NAMA LENGKAP"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", opacity: 0.75 }}>Tgl. Lahir</p>
                <p style={{ fontSize: "13px", fontWeight: "600" }}>
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
                <p style={{ fontSize: "11px", opacity: 0.75 }}>Instansi</p>
                <p style={{ fontSize: "14px", fontWeight: "600" }}>
                  {kelas || "(isi sesuai instansi)"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "11px", opacity: 0.75 }}>Rumah Sakit</p>
                <p style={{ fontSize: "14px", fontWeight: "600" }}>
                  {rumahSakit || "KISAH TANAH AIR"}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "11px",
              opacity: 0.85,
              borderTop: "1px solid rgba(255,255,255,0.3)",
              marginTop: "auto",
              paddingTop: "6px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p>Tanggal Pembuatan</p>
                <p style={{ fontSize: "13px", fontWeight: "600" }}>
                  {formatTanggal(tanggalPembuatan) || "01 September 2025"}
                </p>
              </div>
              <div>
                <p>Masa Berlaku</p>
                <p style={{ fontSize: "13px", fontWeight: "600" }}>
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
