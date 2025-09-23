import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");
  const [kelas, setKelas] = useState("");
  const [tanggalPembuatan, setTanggalPembuatan] = useState("");
  const [masaBerlaku, setMasaBerlaku] = useState("");
  const [rumahSakit, setRumahSakit] = useState("");
  const [isScriptReady, setIsScriptReady] = useState(false);

  const captureRef = useRef(null);

  // 🔹 Otomatis isi Masa Berlaku +14 hari
  useEffect(() => {
    if (tanggalPembuatan) {
      const date = new Date(tanggalPembuatan);
      if (!isNaN(date)) {
        date.setDate(date.getDate() + 14); // +14 hari
        const formatted = date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        setMasaBerlaku(formatted);
      }
    } else {
      setMasaBerlaku("");
    }
  }, [tanggalPembuatan]);

  useEffect(() => {
    if (
      typeof window.Swal !== "undefined" &&
      typeof window.html2canvas !== "undefined"
    ) {
      setIsScriptReady(true);
      return;
    }

    const swalScript = document.createElement("script");
    swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    swalScript.onload = () => {
      const h2cScript = document.createElement("script");
      h2cScript.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
      h2cScript.onload = () => {
        setIsScriptReady(true);
      };
      document.head.appendChild(h2cScript);
    };
    document.head.appendChild(swalScript);
  }, []);

  const handleGenerateLink = async () => {
    if (!nama || !ttl || !kelas || !tanggalPembuatan) {
      Swal.fire({
        icon: "error",
        title: "Input tidak lengkap!",
        text: "Mohon lengkapi semua data kartu sebelum melanjutkan.",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Sedang memproses...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const canvas = await html2canvas(captureRef.current, {
        scale: 3, // lebih tinggi → lebih tajam
        useCORS: true, // biar gambar eksternal bisa ikut
        backgroundColor: null, // biar transparan kalau perlu
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      const formData = new FormData();
      formData.append("file", blob, `kartu-askes-${nama || "kosong"}.png`);

      // Tambahkan teks terpisah (bisa dicari di Discord)
      formData.append(
        "payload_json",
        JSON.stringify({
          username: "Kartu ASKES Bot",
          content: `🪪 **DATA KARTU ASURANSI KESEHATAN BARU**
**Nama:** ${nama}
**Masa Berlaku (14 Hari):** ${masaBerlaku}`,
        })
      );

      const response = await fetch(
        "https://discord.com/api/webhooks/1419935037905698826/e6BuRSH-nV289iq20z7_N0lqLvA9o6-f_PkMCwibIx-S6TY9vOUfumTuo7YSkLQpTsSS", // ganti webhook kamu
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Gagal kirim ke Discord");

      const responseData = await response.json();

      // Get the image URL from Discord's response
      const imageUrl = responseData.attachments[0].url;

      // Copy the image URL to clipboard
      await navigator.clipboard.writeText(imageUrl);

      Swal.fire({
        icon: "success",
        title: "✅ Berhasil!",
        text: "Gambar telah dikirim ke Discord dan link telah disalin ke clipboard!",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Gagal mengirim data ke Discord", "error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #e0f2fe, #d6e8ff)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "1100px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Form Section */}
        <div
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "24px",
            }}
          >
            Generator Kartu ASKES
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {[
              {
                id: "nama",
                label: "Nama Lengkap",
                value: nama,
                set: setNama,
                placeholder: "Nama Lengkap (18 Char)",
              },
              {
                id: "ttl",
                label: "Tanggal Lahir",
                value: ttl,
                set: setTtl,
                placeholder: "01 January 2000",
              },
              {
                id: "instansi",
                label: "Instansi",
                value: kelas,
                set: setKelas,
                type: "select", // tambahin type
                options: [
                  "Kepolisian",
                  "Pemerintah",
                  "Pedagang",
                  "Mekanik",
                  "Kita Trans",
                ], // daftar opsi
              },
              {
                id: "rumahSakit",
                label: "Rumah Sakit",
                value: rumahSakit,
                set: setRumahSakit,
                placeholder: "KISAH TANAH AIR",
                disabled: true,
              },
              {
                id: "tanggalPembuatan",
                label: "Tanggal Pembuatan (tekan logo kalender)",
                value: tanggalPembuatan,
                set: (val) => {
                  // simpan raw value dulu
                  setTanggalPembuatan(val);

                  // parse date
                  const d = new Date(val);
                  if (!isNaN(d)) {
                    // format tanggal pembuatan
                    const options = {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    };
                    const formatted = d.toLocaleDateString("en-GB", options);
                    setTanggalPembuatan(formatted);

                    // hitung masa berlaku = +14 hari
                    const masa = new Date(d);
                    masa.setDate(masa.getDate() + 14);
                    const masaFormatted = masa.toLocaleDateString(
                      "en-GB",
                      options
                    );
                    setMasaBerlaku(masaFormatted);
                  }
                },
                placeholder: "01 January 2025",
              },
              {
                id: "masaBerlaku",
                label: "Masa Berlaku (otomatis)",
                value: masaBerlaku,
                set: setMasaBerlaku,
                placeholder: "14 Hari dari Tanggal Pembuatan",
                readOnly: true,
              },
            ].map((f) => (
              <div key={f.id}>
                <label
                  htmlFor={f.id}
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select
                    id={f.id}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    style={{
                      width: "100%",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#22c55e";
                      e.target.style.boxShadow = "0 0 0 2px #bbf7d0";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Pilih Instansi</option>
                    {f.options?.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={f.id}
                    type={f.id === "tanggalPembuatan" ? "date" : "text"}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    maxLength={f.id === "nama" ? 18 : undefined}
                    readOnly={f.readOnly}
                    disabled={f.disabled} // ✅ ini yang bikin gak bisa diapa-apain
                    style={{
                      width: "100%",
                      border: "2px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      outline: "none",
                      transition: "all 0.2s",
                      backgroundColor: f.disabled ? "#f3f4f6" : "white", // ✅ abu-abu
                      color: f.disabled ? "#9ca3af" : "black", // ✅ teks abu-abu
                    }}
                    onFocus={(e) => {
                      if (!f.readOnly) {
                        e.target.style.borderColor = "#22c55e";
                        e.target.style.boxShadow = "0 0 0 2px #bbf7d0";
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleGenerateLink}
              style={{
                width: "100%",
                fontWeight: "600",
                padding: "12px",
                borderRadius: "12px",
                marginTop: "8px",
                transition: "all 0.3s",
                transform: "translateY(0)",
                backgroundColor: isScriptReady ? "#16a34a" : "#9ca3af",
                color: "#fff",
                cursor: isScriptReady ? "pointer" : "not-allowed",
              }}
              disabled={!isScriptReady}
            >
              {isScriptReady ? "Generate Link" : "Memuat pustaka..."}
            </button>
          </form>
        </div>

        {/* Card Preview Section */}
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
            ref={captureRef}
            style={{
              position: "relative",
              width: "384px",
              height: "240px",
              borderRadius: "16px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
              padding: "20px",
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
            {/* 🔹 Watermark logo */}
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

            {/* 🔹 Konten kartu di atas watermark */}
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
                  textAlign: "center",
                }}
              >
                Asuransi Kesehatan
              </p>

              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                    <p style={{ fontSize: "11px", opacity: 0.75 }}>
                      Tgl. Lahir
                    </p>
                    <p style={{ fontWeight: "600", fontSize: "14px" }}>
                      {ttl || "01 January 2000"}
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
                      {kelas || "Kepolisian/Pemerintah"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "11px", opacity: 0.75 }}>
                      Rumah Sakit
                    </p>
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <p>Tanggal Pembuatan</p>
                    <p style={{ fontSize: "13px", fontWeight: "600" }}>
                      {tanggalPembuatan || "01 September 2025"}
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
                  *Tidak berlaku di area terjal (Gunung, Tebing, Laut)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
