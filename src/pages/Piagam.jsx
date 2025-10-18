import { useState, useRef, useEffect } from "react";
import useExternalScripts from "../hooks/useExternalScripts";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import templateBg from "../assets/bg_certificate.png";
import formatTanggal from "../utils/formatTanggal";

export default function Piagam() {
  useEffect(() => {
    document.title = "Piagam Penghargaan - Sistem Digital";
  }, []);

  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [tanggal, setTanggal] = useState("");
  const isScriptReady = useExternalScripts();
  const captureRef = useRef(null);

  const handleGenerateLink = async () => {
    if (!nama || !kategori || !tanggal) {
      Swal.fire({
        icon: "error",
        title: "Input belum lengkap!",
        text: "Mohon isi semua data piagam sebelum melanjutkan.",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Sedang membuat piagam...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const canvas = await html2canvas(captureRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: null,
        allowTaint: false,
        letterRendering: true,
        logging: false,
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const formData = new FormData();
      formData.append("file", blob, `piagam-${nama || "penghargaan"}.png`);
      formData.append(
        "payload_json",
        JSON.stringify({
          username: "Piagam Digital Bot",
          content: `🏅 **Piagam Baru Telah Dibuat!**\n**Nama:** ${nama}\n**Kategori:** ${kategori}\n**Tanggal:** ${tanggal}`,
        })
      );

      const response = await fetch(
        import.meta.env.VITE_DISCORD_WEBHOOK_PIAGAM,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Gagal kirim ke Discord");

      const responseData = await response.json();
      const imageUrl = responseData.attachments?.[0]?.url;
      if (imageUrl) await navigator.clipboard.writeText(imageUrl);

      Swal.fire({
        icon: "success",
        title: "✅ Piagam berhasil dibuat!",
        text: "Link gambar telah disalin ke clipboard.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Gagal mengirim piagam ke Discord", "error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #e0f2fe, #c7d2fe)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: window.innerWidth < 1024 ? "column" : "row",
          maxWidth: "1200px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f0f9ff, #e0e7ff)",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              color: "#3730a3",
              marginBottom: "20px",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Form Piagam Penghargaan
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#3730a3",
                  marginBottom: "5px",
                }}
              >
                Nama Penerima
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value.slice(0, 40))}
                placeholder="Masukkan nama lengkap penerima penghargaan"
                style={{
                  width: "100%",
                  border: "2px solid #c7d2fe",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "1rem",
                  background: "#f8fafc",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#3730a3",
                  marginBottom: "5px",
                }}
              >
                Kategori Penghargaan
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #c7d2fe",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "1rem",
                  background: "#f8fafc",
                  outline: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
              >
                <option value="">Pilih kategori...</option>
                <option value="Perawat Terbaik">Perawat Terbaik</option>
                <option value="Coass Terbaik">Coass Terbaik</option>
                <option value="Dokter Umum Terbaik">Dokter Umum Terbaik</option>
                <option value="Dokter Spesialis Terbaik">
                  Dokter Spesialis Terbaik
                </option>
                <option value="Direksi Terbaik">Direksi Terbaik</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#3730a3",
                  marginBottom: "5px",
                }}
              >
                Tanggal Penyerahan
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #c7d2fe",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "1rem",
                  background: "#f8fafc",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
              />
            </div>
            <button
              type="button"
              onClick={handleGenerateLink}
              disabled={!isScriptReady}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                background: isScriptReady ? "#f97316" : "#d1d5db",
                border: "none",
                cursor: isScriptReady ? "pointer" : "not-allowed",
                transition: "background 0.2s",
                boxShadow: isScriptReady
                  ? "0 4px 10px rgba(249, 115, 22, 0.3)"
                  : "none",
              }}
              onMouseOver={(e) => {
                if (isScriptReady) e.target.style.background = "#ea580c";
              }}
              onMouseOut={(e) => {
                if (isScriptReady) e.target.style.background = "#f97316";
              }}
            >
              {isScriptReady ? "🎖️ Generate Piagam" : "Memuat pustaka..."}
            </button>
          </form>
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={captureRef}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              aspectRatio: "16/11",
              borderRadius: "15px",
              boxShadow:
                "0 15px 30px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              color: "#374151",
              overflow: "hidden",
              background: `linear-gradient(rgba(255,255,255,0.05), rgba(212,175,55,0.1), rgba(255,215,0,0.08)), url(${templateBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              padding: "clamp(20px, 3vw, 40px)",
              fontFamily: "'Poppins', sans-serif",
              border: "8px solid #D4AF37",
              borderImage:
                "linear-gradient(45deg, #D4AF37, #FFD700, #D4AF37) 1",
            }}
          >
            {/* Decorative golden stars on the right side */}
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                fontSize: "24px",
                color: "#FFD700",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                zIndex: 10,
              }}
            >
              ⭐
            </div>
            <div
              style={{
                position: "absolute",
                top: "80px",
                right: "25px",
                fontSize: "18px",
                color: "#D4AF37",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
            >
              ⭐
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "80px",
                right: "25px",
                fontSize: "20px",
                color: "#FFD700",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                zIndex: 10,
              }}
            >
              ⭐
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                right: "30px",
                fontSize: "16px",
                color: "#D4AF37",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
            >
              ⭐
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "1px clamp(10px, 2vw, 20px)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h1
                  style={{
                    fontSize: "clamp(18px, 2vw, 32px)",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#D4AF37",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    marginBottom: "10px",
                  }}
                >
                  Piagam Penghargaan
                </h1>
              </div>

              <div
                style={{
                  textAlign: "center",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(9px, 1.2vw, 13px)",
                    color: "#000",
                    marginBottom: "5px",
                    marginTop: "-30px",
                    padding: "0 8px",
                    lineHeight: "1.3",
                    textAlign: "center",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Piagam penghargaan ini dengan bangga kami berikan kepada
                </p>

                <div style={{ marginBottom: "3px" }}>
                  <p
                    style={{
                      fontSize:
                        nama && nama.length > 35
                          ? "clamp(15px, 2vw, 19px)"
                          : nama && nama.length > 25
                          ? "clamp(17px, 2.2vw, 21px)"
                          : "clamp(19px, 2.5vw, 28px)",
                      fontWeight: "bold",
                      fontFamily: "'Great Vibes', cursive",
                      textTransform: "capitalize",
                      marginBottom: "8px",
                      wordBreak: "break-word",
                      padding: "0 8px",
                      lineHeight: "1.2",
                      color: "#D4AF37",
                    }}
                  >
                    {nama || "Nama Lengkap Penerima"}
                  </p>
                </div>

                <p
                  style={{
                    fontSize:
                      kategori && kategori.length > 30
                        ? "clamp(11px, 1.5vw, 13px)"
                        : "clamp(12px, 1.7vw, 13px)",
                    color: "#000000",
                    marginBottom: "10px",
                    lineHeight: "1.5",
                    textAlign: "center",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Atas prestasi sebagai{" "}
                  <strong
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {kategori || "Jabatan/Kategori Penghargaan"}
                  </strong>{" "}
                  dengan dedikasi, komitmen, dan kinerja yang luar biasa dalam
                  menjalankan tugasnya.
                </p>

                <div style={{ marginTop: "10px" }}>
                  <p
                    style={{
                      fontSize: "clamp(9px, 1.2vw, 11px)",
                      color: "rgba(0,0,0,0.4)",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Disahkan pada, {formatTanggal(tanggal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
