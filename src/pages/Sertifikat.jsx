import { useState, useRef, useEffect } from "react";
import useExternalScripts from "../hooks/useExternalScripts";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import SertifikatForm from "../components/SertifikatForm";
import SertifikatCard from "../components/SertifikatCard";

export default function Sertifikat() {
  useEffect(() => {
    document.title = "Sertifikat Halal - Sistem Digital";
  }, []);

  const [nomorSertifikat, setNomorSertifikat] = useState("");
  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [jenisMakanan, setJenisMakanan] = useState("");
  const [tanggalPengesahan, setTanggalPengesahan] = useState("");
  const isScriptReady = useExternalScripts();
  const captureRef = useRef(null);

  const handleGenerateLink = async () => {
    if (
      !nomorSertifikat ||
      !namaPerusahaan ||
      !jenisMakanan ||
      !tanggalPengesahan
    ) {
      Swal.fire({
        icon: "error",
        title: "Input belum lengkap!",
        text: "Mohon isi semua data sertifikat sebelum melanjutkan.",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Sedang membuat sertifikat...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: false,
        letterRendering: true,
        logging: false,
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      const formData = new FormData();
      formData.append(
        "file",
        blob,
        `sertifikat-${namaPerusahaan || "halal"}.png`
      );
      formData.append(
        "payload_json",
        JSON.stringify({
          username: "Sertifikat Halal Bot",
          content: `**Nomor Sertifikat:** ${nomorSertifikat}\n**Nama Perusahaan:** ${namaPerusahaan}\n**Link Pembuatan:** https://rs-kisahtanahair.vercel.app/\n**Password:** ${
            import.meta.env.VITE_PROTECTED_PASSWORD_SERTIFIKAT
          }`,
        })
      );

      const response = await fetch(
        import.meta.env.VITE_DISCORD_WEBHOOK_SERTIFIKAT,
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
        title: "✅ Sertifikat berhasil dibuat!",
        text: "Link gambar telah disalin ke clipboard.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Gagal mengirim sertifikat ke Discord", "error");
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
        <SertifikatForm
          nomorSertifikat={nomorSertifikat}
          setNomorSertifikat={setNomorSertifikat}
          namaPerusahaan={namaPerusahaan}
          setNamaPerusahaan={setNamaPerusahaan}
          jenisMakanan={jenisMakanan}
          setJenisMakanan={setJenisMakanan}
          tanggalPengesahan={tanggalPengesahan}
          setTanggalPengesahan={setTanggalPengesahan}
          isScriptReady={isScriptReady}
          handleGenerateLink={handleGenerateLink}
        />

        <div
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SertifikatCard
            ref={captureRef}
            nomorSertifikat={nomorSertifikat}
            namaPerusahaan={namaPerusahaan}
            jenisMakanan={jenisMakanan}
            tanggalPengesahan={tanggalPengesahan}
          />
        </div>
      </div>
    </div>
  );
}
