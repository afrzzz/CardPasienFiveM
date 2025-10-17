import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "/image.png";

const ResignLetter = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [reason, setReason] = useState("");
  const pdfRef = useRef();

  // Set judul halaman browser
  useEffect(() => {
    document.title = "Surat Pengunduran Diri - Rumah Sakit Kisah Tanah Air";
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Pilih font tanda tangan acak
  const cursiveFonts = [
    "Brush Script MT, cursive",
    "Dancing Script, cursive",
    "Great Vibes, cursive",
    "Allura, cursive",
    "Pacifico, cursive",
  ];
  const randomFont =
    cursiveFonts[Math.floor(Math.random() * cursiveFonts.length)];

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = name
        ? `${name.replace(/\s+/g, " ")} Surat-Pengunduran-Diri.pdf`
        : "Surat_Pengunduran_Diri.pdf";

      pdf.save(fileName);
    } catch (error) {
      console.error("Gagal generate PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF. Coba isi ulang form.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f5f9ff, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "700px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1a1a1a",
            fontSize: "22px",
            marginBottom: "25px",
            fontWeight: "bold",
          }}
        >
          Form Surat Pengunduran Diri
        </h1>

        {/* FORM INPUT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Jabatan
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Contoh: Perawat, Tenaga Medis, Admin, dsb."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px" }}>
              Alasan Pengunduran Diri
            </label>
            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tuliskan alasan kamu dengan sopan dan profesional"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                resize: "none",
              }}
            />
          </div>
        </div>

        {/* PREVIEW SURAT */}
        {(name || position || reason) && (
          <div
            ref={pdfRef}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#fff",
              padding: "50px 45px",
              lineHeight: "1.8",
              color: "#333",
              fontSize: "14px",
              marginTop: "40px",
            }}
          >
            {/* KOP SURAT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "2px solid #0077cc",
                paddingBottom: "8px",
                marginBottom: "25px",
              }}
            >
              <img
                src={logo}
                alt="Logo Rumah Sakit"
                style={{ width: "65px", marginRight: "12px" }}
              />
              <div>
                <h2 style={{ margin: 0, color: "#0077cc", fontSize: "18px" }}>
                  RUMAH SAKIT KISAH TANAH AIR
                </h2>
                <p style={{ margin: 0, fontSize: "12px", color: "#444" }}>
                  Jl. Elysian Fields Fwy, East Los Santos, Coordinator: 9333
                  <br />
                  Telp: (021) 123-4567 | Web:
                  https://rs-kisahtanahair.vercel.app/
                </p>
              </div>
            </div>

            {/* ISI SURAT */}
            <div style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
              <p style={{ textAlign: "right" }}>{today}</p>

              <p>
                Yth. Pimpinan Rumah Sakit Kisah Tanah Air
                <br />
                di Tempat
              </p>

              <p>
                <strong>Perihal:</strong> Surat Pengunduran Diri
              </p>
              {"\n"}
              <p>Dengan hormat,</p>

              <p>
                Saya yang bertanda tangan di bawah ini bermaksud untuk
                mengajukan pengunduran diri dari posisi saya di Rumah Sakit
                Kisah Tanah Air dengan data sebagai berikut:
              </p>
              {"\n"}
              <p>
                Nama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                <strong>{name || "—"}</strong>
                <br />
                Jabatan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                <strong>{position || "—"}</strong>
                <br />
                Alasan Pengunduran Diri :<strong>{reason || "—"}</strong>
              </p>
              {"\n"}
              <p>
                Saya mengucapkan terima kasih atas kesempatan, pengalaman, dan
                kerja sama yang baik selama bekerja di Rumah Sakit Kisah Tanah
                Air. Saya mohon maaf apabila selama bekerja terdapat kesalahan
                kata maupun perbuatan.
              </p>

              <p>
                Demikian surat pengunduran diri ini saya buat dengan penuh
                kesadaran dan tanpa paksaan dari pihak mana pun. Atas perhatian
                dan pengertiannya saya ucapkan terima kasih.
              </p>

              {/* TANDA TANGAN */}
              <div style={{ marginTop: "50px", textAlign: "left" }}>
                <p>Hormat saya,</p>
                <p style={{ fontWeight: "bold", marginBottom: 0 }}>
                  {name || "—"}
                </p>
                <p style={{ marginTop: "2px" }}>{position || "—"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tombol Generate PDF */}
        {(name || position || reason) && (
          <button
            onClick={handleDownloadPDF}
            style={{
              marginTop: "25px",
              width: "100%",
              backgroundColor: "#0077cc",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#005fa3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0077cc")}
          >
            Generate PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default ResignLetter;
