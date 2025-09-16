import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";

export default function App() {
  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isBack, setIsBack] = useState(false);

  const frontRef = useRef(null);

  const handleGenerateLink = async () => {
    if (!frontRef.current) return;

    const cardCanvas = await html2canvas(frontRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const padding = 60;
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = cardCanvas.width + padding * 2;
    finalCanvas.height = cardCanvas.height + padding * 2;

    const ctx = finalCanvas.getContext("2d");
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

    ctx.shadowColor = "rgba(0,0,0,0.25)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 20;

    ctx.drawImage(cardCanvas, padding, padding);

    const dataUrl = finalCanvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();

    const webhookUrl =
      "https://discord.com/api/webhooks/1417390391719759914/fRAEuHB2l-1YBtYDEKF_pyzGhT99ziqO3BQ5sLT62nzV9n0KsUpk17ZVjpKTFt6OSoxl";
    const formData = new FormData();
    formData.append("file", blob, `${nama || "kta"}.png`);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload gagal");
      const result = await response.json();
      const fileUrl = result.attachments[0].url;

      await navigator.clipboard.writeText(fileUrl);

      Swal.fire({
        title: "✅ Link berhasil dibuat!",
        html: `
        <p>Link KTA sudah disalin ke clipboard.</p>
        <p class="mt-2"><a href="${fileUrl}" target="_blank" class="text-blue-600 underline">🔗 Buka Link</a></p>
      `,
        icon: "success",
        background: "#eff6ff",
        color: "#1e3a8a",
        confirmButtonText: "Oke",
        confirmButtonColor: "#2563eb",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Gagal upload ke Discord Webhook", "error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #60a5fa, #2563eb)", // from-blue-400 ke blue-600 (HEX)
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl grid md:grid-cols-2 w-full max-w-5xl overflow-hidden">
        {/* Form Section */}
        <div className="p-8 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Generator KTA
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              placeholder="Jabatan"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              style={{ borderColor: "#d1d5db", focus: "#60a5fa" }} // gray-300 + blue-400
            />
            <input
              type="text"
              value={nama}
              onChange={(e) => {
                if (e.target.value.length <= 58) setNama(e.target.value);
              }}
              placeholder="Nama Lengkap"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              style={{ borderColor: "#d1d5db" }}
            />
            <input
              type="text"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              placeholder="Tanggal Lahir"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              style={{ borderColor: "#d1d5db" }}
            />
            <input
              type="text"
              value={status}
              onFocus={() => setIsBack(true)}
              onBlur={() => setIsBack(false)}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              style={{ borderColor: "#d1d5db" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              style={{ borderColor: "#d1d5db" }}
            />
            <button
              type="button"
              onClick={handleGenerateLink}
              className="w-full font-semibold py-2 rounded-lg mt-2"
              style={{
                backgroundColor: "#2563eb", // blue-600
                color: "#fff",
              }}
            >
              Generate Link
            </button>
          </form>
        </div>

        {/* Card Preview */}
        <div
          className="flex items-center justify-center p-8"
          style={{ backgroundColor: "#1e3a8a" }} // bg-blue-800
        >
          <motion.div
            className="relative w-96 h-60 rounded-xl shadow-lg text-white border"
            animate={{ rotateY: isBack ? 180 : 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              transformStyle: "preserve-3d",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {/* Front Kartu */}
            <div
              ref={frontRef}
              className="w-full h-full rounded-xl p-6 flex flex-col justify-between"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", // fixed HEX
                color: "#fff",
              }}
            >
              {/* header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold max-w-[60%]">
                  Kartu Tanda Anggota
                </h3>
                <span className="text-sm max-w-[35%]">📌 Medic KITA</span>
              </div>

              {/* info */}
              <div className="flex justify-between mt-4">
                <div className="flex flex-col gap-1 max-w-[calc(100%-7rem)]">
                  <p className="text-sm">Jabatan: {jabatan || "Jabatan"}</p>
                  <p className="font-semibold">{nama || "Nama Anggota"}</p>
                  {status && (
                    <span
                      className="absolute bottom-4 left-4 text-sm font-semibold"
                      style={{
                        padding: "0.50rem 0.75rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {status}
                    </span>
                  )}
                </div>

                {photo && (
                  <div className="flex flex-col items-center w-28 flex-shrink-0">
                    <div
                      className="flex items-center justify-center overflow-hidden"
                      style={{
                        width: "7rem",
                        height: "7rem",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(255,255,255,0.4)",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <img
                        src={photo}
                        alt="Profile"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        opacity: 0.8,
                      }}
                    >
                      {ttl || "TTL"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Kartu */}
            <div
              className="absolute inset-0 rounded-xl p-6 flex flex-col justify-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #1d4ed8, #1e40af)", // HEX biru
                color: "#fff",
              }}
            >
              <h3 className="text-center font-semibold mb-4">Detail Anggota</h3>

              <div
                className="p-2 rounded-md mb-2 text-center overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <p className="font-semibold text-sm truncate">
                  {(nama || "Nama Anggota").split(" ").slice(0, 10).join(" ")}
                </p>
                <p className="text-xs">{jabatan || "Jabatan"}</p>
              </div>

              <div
                className="p-2 rounded-md text-center overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <p className="font-semibold text-sm">
                  {ttl || "Tanggal Lahir"}
                </p>
                <p className="text-xs">{status || "Status"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
