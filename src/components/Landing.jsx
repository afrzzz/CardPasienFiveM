import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FaHeartbeat,
  FaHospitalUser,
  FaStethoscope,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

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

function TestimonialCard({ name, role, message, image, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200 to-sky-200 rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-indigo-200"
        />
        <div>
          <h4 className="font-semibold text-indigo-700">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <FaQuoteLeft className="text-indigo-300 text-2xl mb-2" />
      <p className="text-gray-700 italic leading-relaxed">{message}</p>
      <div className="flex mt-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: delay + i * 0.1,
              type: "spring",
              stiffness: 200,
            }}
          >
            <FaStar className="text-yellow-400 text-sm" />
          </motion.div>
        ))}
      </div>
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

  const testimonials = [
    {
      name: "Dr. Ahmad Santoso",
      role: "Direktur Utama",
      message:
        "Rumah Sakit Kisah Tanah Air telah menjadi rumah kedua bagi banyak pasien. Komitmen kami adalah memberikan pelayanan kesehatan terbaik dengan hati yang tulus.",
      image: "/images/executives/petinggi1.jpg",
    },
    {
      name: "Siti Nurhaliza",
      role: "Pasien Rawat Inap",
      message:
        "Pengalaman saya di sini sangat luar biasa. Staf medisnya sangat perhatian dan fasilitasnya modern. Terima kasih atas pelayanannya!",
      image: "/images/executives/noimage.png",
    },
    {
      name: "Prof. Dr. Budi Raharjo",
      role: "Kepala Bagian Kardiologi",
      message:
        "Kami bangga dengan tim ahli yang selalu siap memberikan perawatan terbaik. Inovasi dan teknologi terkini adalah prioritas kami.",
      image: "/images/executives/noimage.png",
    },
  ];

  const texts = [
    "Pelayanan dengan Hati yang Tulus ❤️",
    "Profesionalisme & Inovasi Terdepan 👨‍⚕️",
    "Kesehatan Anda, Komitmen Kami 🏥",
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
    <main className="relative min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-50 flex flex-col justify-center items-center text-center px-6 py-12 overflow-hidden">
      {/* ☁️ Background awan */}
      <motion.div
        style={{ y: yCloud1 }}
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-sky-200 to-indigo-200 rounded-full blur-3xl opacity-70"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: yCloud2 }}
        className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-60"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-sky-300/50 to-indigo-300/50 rounded-full blur-3xl opacity-50"
      />

      {/* ✨ Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-60"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🏥 Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          Rumah Sakit Kisah Tanah Air
        </motion.h1>

        <motion.p
          className="text-xl md:text-3xl text-gray-800 font-medium h-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block ml-2 w-3 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-sm"
          ></motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-full"
          >
            <motion.button
              onClick={() => (window.location.href = "/strukturpetinggi")}
              whileHover={{
                boxShadow: "0 0 40px rgba(99, 102, 241, 0.6)",
                backgroundPosition: "100% 0",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                👥 Struktur Petinggi
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-full"
          >
            <motion.button
              onClick={() => (window.location.href = "/ai-chat")}
              whileHover={{
                boxShadow: "0 0 40px rgba(14, 165, 233, 0.6)",
                backgroundPosition: "100% 0",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 text-white font-bold text-lg rounded-full shadow-2xl transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                🤖 Obrolan AI Pintar
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* 🧩 Fitur utama */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-12 z-10">
        <FeatureCard
          icon={<FaHeartbeat className="text-5xl text-sky-600 mb-4" />}
          title="Pelayanan 24 Jam"
          desc="Kami selalu siap melayani Anda kapan pun dengan tenaga medis profesional dan fasilitas terbaik."
          delay={0.1}
        />
        <FeatureCard
          icon={<FaHospitalUser className="text-5xl text-indigo-600 mb-4" />}
          title="Tenaga Medis Ahli"
          desc="Didukung oleh dokter berpengalaman di berbagai bidang kesehatan untuk menjamin kualitas pelayanan."
          delay={0.3}
        />
        <FeatureCard
          icon={<FaStethoscope className="text-5xl text-blue-600 mb-4" />}
          title="Fasilitas Modern"
          desc="Nikmati layanan kesehatan yang nyaman, cepat, dan berbasis teknologi terkini."
          delay={0.5}
        />
      </section>

      {/* 🌟 Testimonial Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20 z-10 max-w-7xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-3xl md:text-4xl font-bold text-indigo-700 mb-12 text-center"
        >
          Apa Kata Mereka Tentang Kami
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              message={testimonial.message}
              image={testimonial.image}
              delay={index * 0.2}
            />
          ))}
        </div>
      </motion.section>

      {/* 🕒 Tanggal dan Footer */}
      <div className="mt-20 z-10 w-full max-w-4xl">
        <motion.p
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-slate-500 text-center mb-8"
        >
          Hari ini: {today}
        </motion.p>

        <footer className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-indigo-600">
            Rumah Sakit Kisah Tanah Air
          </span>{" "}
          — Created by Afrzzz.
        </footer>
      </div>
    </main>
  );
}
