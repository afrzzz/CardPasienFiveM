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

    const canvas = await html2canvas(frontRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const roundedCanvas = document.createElement("canvas");
    const ctx = roundedCanvas.getContext("2d");

    roundedCanvas.width = canvas.width;
    roundedCanvas.height = canvas.height;

    ctx.clearRect(0, 0, roundedCanvas.width, roundedCanvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, roundedCanvas.width, roundedCanvas.height, 40);
    ctx.clip();
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    const dataUrl = roundedCanvas.toDataURL("image/png");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-6">
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
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              value={nama}
              onChange={(e) => {
                if (e.target.value.length <= 58) setNama(e.target.value);
              }}
              placeholder="Nama Lengkap"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              placeholder="Tanggal Lahir"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              value={status}
              onFocus={() => setIsBack(true)}
              onBlur={() => setIsBack(false)}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="button"
              onClick={handleGenerateLink}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2"
            >
              Generate Link
            </button>
          </form>
        </div>

        {/* Card Preview */}
        <div className="bg-blue-800 flex items-center justify-center p-8">
          <motion.div
            className="relative w-96 h-60 rounded-xl shadow-lg text-white border border-white/30"
            animate={{ rotateY: isBack ? 180 : 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            style={{
              transformStyle: "preserve-3d",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {/* Front Kartu */}
            <div
              ref={frontRef}
              className="absolute inset-0 rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br from-blue-500 to-blue-700"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold truncate max-w-[60%]">
                  Kartu Tanda Anggota
                </h3>
                <span className="text-sm truncate max-w-[35%]">
                  📌 Medic KITA
                </span>
              </div>

              {/* Info + Foto */}
              <div className="flex justify-between mt-4">
                {/* Kolom kiri */}
                <div
                  className="flex flex-col gap-1"
                  style={{ maxWidth: "calc(100% - 7rem)" }}
                >
                  <p className="tracking-wide text-sm truncate">
                    Jabatan: {jabatan || "Jabatan"}
                  </p>
                  <p className="font-semibold text-lg break-words">
                    {nama || "Nama Anggota"}
                  </p>

                  {/* Status di kiri bawah */}
                  {status && (
                    <div className="mt-auto text-sm font-semibold bg-white/20 px-3 py-1 rounded w-max text-center">
                      {status}
                    </div>
                  )}
                </div>

                {/* Kolom kanan: foto + TTL */}
                {photo && (
                  <div className="flex flex-col items-center w-28 flex-shrink-0">
                    <div className="w-28 h-28 overflow-hidden border border-white/40 rounded">
                      <img
                        src={photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* TTL di bawah foto */}
                    <p className="mt-2 text-sm opacity-80">{ttl || "TTL"}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Kartu */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-6 flex flex-col justify-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h3 className="text-white text-lg font-bold text-center mb-4">
                Detail Anggota
              </h3>

              {/* Nama & Jabatan */}
              <div className="bg-white/20 p-3 rounded mb-2 text-center overflow-hidden">
                <p className="text-sm font-semibold truncate break-words">
                  {(nama || "Nama Anggota").split(" ").slice(0, 10).join(" ")}
                </p>
                <p className="text-xs truncate break-words">
                  {jabatan || "Jabatan"}
                </p>
              </div>

              {/* TTL & Status */}
              <div className="bg-white/20 p-3 rounded text-center overflow-hidden">
                <p className="text-sm font-semibold truncate">
                  {ttl || "Tanggal Lahir"}
                </p>
                <p className="text-xs truncate">{status || "Status"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
