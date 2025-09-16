import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";

export default function App() {
  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");
  const [nomor, setNomor] = useState("");
  const [status, setStatus] = useState("");
  const [isBack, setIsBack] = useState(false);

  const frontRef = useRef(null); // ✅ ref hanya untuk tampilan depan

  const handleGenerateLink = async () => {
    if (!frontRef.current) return;

    // Render kartu depan → PNG
    const canvas = await html2canvas(frontRef.current, { scale: 2 });
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();

    // 🔗 Ganti dengan Webhook Discord kamu
    const webhookUrl =
      "https://discord.com/api/webhooks/1417390391719759914/fRAEuHB2l-1YBtYDEKF_pyzGhT99ziqO3BQ5sLT62nzV9n0KsUpk17ZVjpKTFt6OSoxl";
    const formData = new FormData();
    formData.append("file", blob, `${nama || "kartu_pasien"}.png`);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload gagal");
      const result = await response.json();

      // ✅ Ambil link file CDN dari Discord
      const fileUrl = result.attachments[0].url;

      await navigator.clipboard.writeText(fileUrl);

      Swal.fire({
        title: "✅ Link berhasil dibuat!",
        html: `
        <p>Link kartu pasien sudah disalin ke clipboard.</p>
        <p class="mt-2"><a href="${fileUrl}" target="_blank" class="text-green-600 underline">🔗 Buka Link</a></p>
      `,
        icon: "success",
        background: "#f0fdf4",
        color: "#166534",
        confirmButtonText: "Oke",
        confirmButtonColor: "#16a34a",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Gagal upload ke Discord Webhook", "error");
    }
  };

  const handleDownloadCard = async () => {
    if (!frontRef.current) return;
    const canvas = await html2canvas(frontRef.current, {
      scale: 2, // ✅ hasil download lebih tajam
    });
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${nama || "kartu_pasien"}.png`;
    link.click();

    Swal.fire({
      title: "📥 Kartu berhasil diunduh!",
      text: "File kartu pasien sudah tersimpan di perangkat kamu.",
      icon: "success",
      background: "#f0fdf4",
      color: "#166534",
      confirmButtonText: "Oke",
      confirmButtonColor: "#16a34a",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4ade80] p-6">
      <div className="bg-white rounded-2xl shadow-2xl grid md:grid-cols-2 w-full max-w-5xl overflow-hidden">
        {/* Form Section */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Generator Kartu Pasien
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Nomor Pasien
              </label>
              <input
                type="text"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                placeholder="123456789"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Budi Santoso"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Tanggal Lahir
              </label>
              <input
                type="text"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
                placeholder="01-01-2000"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Status</label>
              <input
                type="text"
                value={status}
                onFocus={() => setIsBack(true)}
                onBlur={() => setIsBack(false)}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Sehat"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleGenerateLink}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
              >
                Generate Link
              </button>
              <button
                type="button"
                onClick={handleDownloadCard}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg"
              >
                Download Kartu
              </button>
            </div>
          </form>
        </div>

        {/* Card Preview */}
        <div className="bg-[#065f46] flex items-center justify-center p-8">
          <motion.div
            className="relative w-80 h-48 rounded-xl shadow-lg text-white"
            animate={{ rotateY: isBack ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              ref={frontRef} // ✅ hanya front yang diref
              className="absolute inset-0 bg-[#22c55e] rounded-xl p-6 flex flex-col justify-between backface-hidden"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">Kartu Pasien</h3>
                <span className="text-sm">🏥 Klinik Sehat</span>
              </div>
              <div>
                <p className="tracking-wide text-sm mb-2">
                  Nomor: {nomor || "XXXXXX"}
                </p>
                <p className="font-semibold">{nama || "Nama Pasien"}</p>
                <p className="text-sm">{ttl || "TTL"}</p>
              </div>
              <div className="absolute bottom-4 right-6 text-sm font-semibold">
                {status || "Status"}
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-[#1f2937] rounded-xl p-6 flex flex-col justify-center rotate-y-180 backface-hidden">
              <div className="w-full h-10 bg-black mb-4"></div>
              <div className="text-center">
                <p className="bg-white px-3 py-1 rounded text-black font-bold inline-block">
                  {status || "Status Pasien"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
