import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TEAM = [
  {
    id: 1,
    name: "dr. Anindya Rahman",
    role: "CEO / Direktur Utama",
    src: "/images/executives/petinggi1.jpg",
    level: "atas",
  },
  {
    id: 2,
    name: "dr. Bagus Setiawan",
    role: "Direktur Medis",
    src: "/images/executives/petinggi1.jpg",
    level: "atas",
  },
  {
    id: 3,
    name: "dr. Citra Lestari",
    role: "Wakil Direktur",
    src: "/images/executives/petinggi1.jpg",
    level: "atas",
  },
  {
    id: 4,
    name: "dr. Fadli Muchtar",
    role: "Kepala Pelayanan",
    src: "/images/executives/petinggi1.jpg",
    level: "bawah",
  },
  {
    id: 5,
    name: "dr. Rizka Amelia",
    role: "Kepala Keperawatan",
    src: "/images/executives/petinggi1.jpg",
    level: "bawah",
  },
  {
    id: 6,
    name: "dr. Yoga Pratama",
    role: "Kepala Keuangan",
    src: "/images/executives/petinggi1.jpg",
    level: "bawah",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function DataPetinggi() {
  useEffect(() => {
    document.title = "PETINGGI MEDIS - KISAH TANAH AIR";
  }, []);

  const topLevel = TEAM.filter((t) => t.level === "atas");
  const bottomLevel = TEAM.filter((t) => t.level === "bawah");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-800">
      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 via-indigo-500 to-cyan-400">
              Struktur Petinggi Rumah Sakit
            </span>
          </motion.h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Kepemimpinan yang solid dengan komitmen terhadap pelayanan terbaik
            dan kemanusiaan.
          </p>
        </div>
      </section>

      {/* STRUKTUR ATAS */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-center">
          {topLevel.map((t, i) => (
            <motion.div
              key={t.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative bg-white/30 backdrop-blur-lg border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl p-6 text-center hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl mb-4">
                <img
                  src={t.src}
                  alt={t.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
                />
              </div>
              <h3 className="text-lg font-semibold text-sky-900 group-hover:text-sky-700 transition-colors">
                {t.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STRUKTUR BAWAH */}
      <section className="max-w-6xl mx-auto px-6 mt-20 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-10 justify-center">
          {bottomLevel.map((t, i) => (
            <motion.div
              key={t.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative bg-white/30 backdrop-blur-lg border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl p-6 text-center hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl mb-4">
                <img
                  src={t.src}
                  alt={t.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => (e.currentTarget.src = "/default-doctor.jpg")}
                />
              </div>
              <h3 className="text-lg font-semibold text-sky-900 group-hover:text-sky-700 transition-colors">
                {t.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/50 py-8 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center px-6">
          <blockquote className="italic text-slate-600 text-sm md:text-base">
            “Kepemimpinan adalah fondasi dari pelayanan yang penuh empati.”
          </blockquote>
          <p className="mt-4 text-sm text-slate-500">
            © {new Date().getFullYear()} Rumah Sakit Kisah Tanah Air
          </p>
        </div>
      </footer>
    </div>
  );
}
