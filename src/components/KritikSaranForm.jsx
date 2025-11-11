import { useState } from "react";
import { motion } from "framer-motion";

export default function KritikSaranForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Nama dan pesan tidak boleh kosong.");
      return;
    }

    if (message.length > 1000) {
      setError("Pesan terlalu panjang. Maksimal 1000 karakter.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        import.meta.env.VITE_DISCORD_WEBHOOK_KELUHAN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: "📢 **PEMBERITAHUAN FOR** <@&1308825800572801044>",
            embeds: [
              {
                title: "Kritik dan Saran Baru",
                color: 3447003, // Indigo color
                fields: [
                  {
                    name: "Nama",
                    value: name,
                    inline: true,
                  },
                  {
                    name: "Kategori",
                    value: category || "Tidak dipilih",
                    inline: true,
                  },
                  {
                    name: "Alasan",
                    value: message,
                    inline: false,
                  },
                  {
                    name: "🔗 Link Keluhan",
                    value: "https://rs-kisahtanahair.vercel.app/",
                    inline: false,
                  },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setName("");
        setCategory("");
        setMessage("");
      } else {
        setError("Sedang ada perbaikan server. Silakan coba lagi nanti.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-2xl max-w-md mx-auto shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: 2,
              delay: 0.3,
            }}
            className="text-4xl mb-2"
          >
            ✅
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-bold text-lg mb-1"
          >
            Terima kasih!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm mb-4"
          >
            Kritik dan saran Anda telah dikirim.
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
    >
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-indigo-700 mb-6 text-center"
      >
        Kritik dan Saran
      </motion.h3>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm mb-6"
        >
          {error}
        </motion.p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Masukkan nama Anda"
            maxLength="50"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {name.length}/50 karakter
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="">Pilih kategori</option>
            <option value="Pelayanan">Pelayanan</option>
            <option value="Fasilitas">Fasilitas</option>
            <option value="Tenaga Medis">Tenaga Medis</option>
            <option value="Administrasi">Administrasi</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alasan
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-200"
          rows="6"
          placeholder="Jelaskan alasan atau detail keluhan Anda..."
          maxLength="1000"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {message.length}/1000 karakter
        </p>
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {isSubmitting ? "Mengirim..." : "Kirim Kritik & Saran"}
      </motion.button>
    </motion.form>
  );
}
