import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FaHeartbeat, FaHospitalUser, FaStethoscope } from "react-icons/fa";
import ChatAssistant from "./ChatAssistant";

function FeatureCard({ icon, title, desc, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500"
    >
      {icon}
      <h3 className="text-lg font-semibold text-indigo-700 mb-2">{title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function Beranda() {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState("");
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Pelayanan dengan Hati ❤️",
    "Profesionalisme untuk Semua 👨‍⚕️",
    "Kesehatan Anda, Prioritas Kami 🏥",
  ];

  // Ganti bagian useEffect tanggal lama menjadi ini:
  useEffect(() => {
    document.title = "RS KISAH TANAH AIR";

    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setToday(`${dateStr} — ${timeStr}`);

      const date = now.getDate();
      setIsOpen(date >= 20 && date <= 26);
    };

    // Jalankan pertama kali
    updateDateTime();

    // Update setiap 1 detik
    const interval = setInterval(updateDateTime, 1000);

    // Hapus interval saat komponen unmount
    return () => clearInterval(interval);
  }, []);

  // ⌨️ Efek mengetik dengan loop
  useEffect(() => {
    const currentText = texts[index];
    const speed = isDeleting ? 40 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts]);

  // ☁️ Parallax awan
  const { scrollY } = useScroll();
  const yCloud1 = useTransform(scrollY, [0, 400], [0, 80]);
  const yCloud2 = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* ☁️ Background awan */}
      <motion.div
        style={{ y: yCloud1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-60"
      />
      <motion.div
        style={{ y: yCloud2 }}
        className="absolute top-40 right-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl opacity-40"
      />

      {/* 🏥 Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 z-10"
      >
        Rumah Sakit Kisah Tanah Air
      </motion.h1>

      {/* ✨ Efek mengetik */}
      <motion.p
        className="text-xl md:text-2xl text-gray-800 font-medium h-8 mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block ml-1 w-2 h-5 bg-indigo-600 rounded-sm"
        ></motion.span>
      </motion.p>

      {/* 🧩 Fitur utama */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-6 z-10">
        <FeatureCard
          icon={<FaHeartbeat className="text-4xl text-sky-600 mb-3" />}
          title="Pelayanan 24 Jam"
          desc="Kami selalu siap melayani Anda kapan pun dengan tenaga medis profesional dan fasilitas terbaik."
          delay={0.1}
        />
        <FeatureCard
          icon={<FaHospitalUser className="text-4xl text-indigo-600 mb-3" />}
          title="Tenaga Medis Ahli"
          desc="Didukung oleh dokter berpengalaman di berbagai bidang kesehatan untuk menjamin kualitas pelayanan."
          delay={0.3}
        />
        <FeatureCard
          icon={<FaStethoscope className="text-4xl text-blue-600 mb-3" />}
          title="Fasilitas Modern"
          desc="Nikmati layanan kesehatan yang nyaman, cepat, dan berbasis teknologi terkini."
          delay={0.5}
        />
      </section>

      {/* 🔘 Tombol Aksi Modern & Animatif */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 z-10 text-center space-y-4"
      >
        {isOpen ? (
          <motion.a
            href="https://forms.gle/73qh2ZU8vh9MjRXB6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka halaman career eksternal"
            whileHover={{
              scale: 1.08,
              boxShadow: "0 0 25px rgba(56,189,248,0.6)",
            }}
            whileTap={{ scale: 0.96 }}
            className="relative inline-block overflow-hidden px-10 py-4 rounded-full text-white font-semibold text-sm tracking-wide uppercase transition-all duration-300 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 shadow-lg"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-40"
              animate={{ x: ["-150%", "150%"] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            <motion.span
              animate={{
                textShadow: [
                  "0 0 5px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(56,189,248,0.8)",
                  "0 0 5px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              OPEN RECRUITMENT — APPLY NOW
            </motion.span>
          </motion.a>
        ) : (
          <motion.button
            disabled
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: [0.8, 0.6, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-10 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-full shadow-inner cursor-not-allowed text-sm tracking-wide uppercase inline-block"
          >
            RECRUITMENT CLOSED
          </motion.button>
        )}

        {/* 🕓 Status dan Waktu */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-slate-700 italic"
        >
          {isOpen
            ? "✨ Pendaftaran dibuka hingga tanggal 26 setiap bulan."
            : "🔒 Pendaftaran dibuka pada tanggal 20 Oktober 2025."}
        </motion.p>

        <motion.p
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-slate-500"
        >
          Hari ini: {today}
        </motion.p>
      </motion.div>

      {/* 🦶 Footer */}
      <footer className="mt-16 text-sm text-gray-500 z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-indigo-600">
          Rumah Sakit Kisah Tanah Air
        </span>{" "}
        — Created by Afrzzz.
      </footer>

      {/* 💬 Chat Assistant */}
      <ChatAssistant />
    </main>
  );
}
