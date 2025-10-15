import { useState, useRef, useEffect } from "react";
import PatientForm from "./components/PatientForm";
import PatientCard from "./components/PatientCard";
import useExternalScripts from "./hooks/useExternalScripts";

export default function App() {
  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");
  const [kelas, setKelas] = useState("");
  const [tanggalPembuatan, setTanggalPembuatan] = useState("");
  const [masaBerlaku, setMasaBerlaku] = useState("");
  const [rumahSakit, setRumahSakit] = useState("");

  const isScriptReady = useExternalScripts();
  const captureRef = useRef(null);

  useEffect(() => {
    if (!tanggalPembuatan) {
      setMasaBerlaku("");
      return;
    }
    const date = new Date(tanggalPembuatan);
    if (!isNaN(date)) {
      date.setDate(date.getDate() + 14);
      setMasaBerlaku(
        date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      );
    }
  }, [tanggalPembuatan]);

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
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const canvas = await html2canvas(captureRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const formData = new FormData();
      formData.append("file", blob, `kartu-askes-${nama || "kosong"}.png`);
      formData.append(
        "payload_json",
        JSON.stringify({
          username: "Kartu ASKES Bot",
          content: `\n**Askes** ${nama}\n**Masa Berlaku Sampai :** ${masaBerlaku}`,
        })
      );

      const response = await fetch(
        "https://discord.com/api/webhooks/1419935037905698826/e6BuRSH-nV289iq20z7_N0lqLvA9o6-f_PkMCwibIx-S6TY9vOUfumTuo7YSkLQpTsSS",
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Gagal kirim ke Discord");
      const responseData = await response.json();
      const imageUrl = responseData.attachments?.[0]?.url;
      if (imageUrl) await navigator.clipboard.writeText(imageUrl);
      Swal.fire({
        icon: "success",
        title: "✅ Berhasil!",
        text: "Link kartu berhasil disalin ke clipboard!",
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
        <PatientForm
          nama={nama}
          setNama={setNama}
          ttl={ttl}
          setTtl={setTtl}
          kelas={kelas}
          setKelas={setKelas}
          rumahSakit={rumahSakit}
          setRumahSakit={setRumahSakit}
          tanggalPembuatan={tanggalPembuatan}
          setTanggalPembuatan={setTanggalPembuatan}
          masaBerlaku={masaBerlaku}
          isScriptReady={isScriptReady}
          handleGenerateLink={handleGenerateLink}
        />

        <PatientCard
          refProp={captureRef}
          nama={nama}
          ttl={ttl}
          kelas={kelas}
          rumahSakit={rumahSakit}
          tanggalPembuatan={tanggalPembuatan}
          masaBerlaku={masaBerlaku}
        />
      </div>
    </div>
  );
}
