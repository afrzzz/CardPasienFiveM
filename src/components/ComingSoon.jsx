import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const messages = [
    "Sabar ya, on progress... 🚀",
    "Fitur keren sedang dibuat! ✨",
    "Tunggu sebentar lagi ya! 💖",
  ];

  // Efek mengetik
  useEffect(() => {
    const currentText = messages[index];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % messages.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, messages]);

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

      {/* Robot animasi */}
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 mb-8"
      >
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FaCog className="text-4xl text-purple-600" />
          </motion.div>
        </div>
        {/* Mata robot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-8 left-8 w-4 h-4 bg-blue-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          className="absolute top-8 right-8 w-4 h-4 bg-blue-500 rounded-full"
        />
      </motion.div>

      {/* Judul */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 z-10"
      >
        Coming Soon!
      </motion.h1>

      {/* Pesan mengetik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-800 font-medium h-12 mb-8 z-10"
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block ml-1 w-2 h-5 bg-indigo-600 rounded-sm"
        />
      </motion.div>

      {/* Tombol Kembali ke Beranda */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="z-10"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 text-white font-semibold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg rounded-full"
          >
            Kembali ke Beranda 🏠
          </motion.button>
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500 z-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-indigo-600">
          Rumah Sakit Kisah Tanah Air
        </span>{" "}
        — Created by Afrzzz.
      </footer>
    </main>
  );
}
