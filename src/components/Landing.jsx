import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHospitalUser } from "react-icons/fa";

const executives = [
  { id: 1, name: "Dr.", role: "Direktur Utama", src: "/ceo.jpg" },
  {
    id: 2,
    name: "Dr.",
    role: "Wakil Direktur",
    src: "/wakil.jpg",
  },
  { id: 3, name: "Dr.", role: "HRD", src: "/hrd.jpg" },
  { id: 4, name: "Dr.", role: "Komdis", src: "/komdis.jpg" },
  { id: 5, name: "Dr.", role: "Keuangan", src: "/keuangan.jpg" },
  { id: 6, name: "Dr.", role: "Pemasaran", src: "/pemasaran.jpg" },
  { id: 7, name: "Dr.", role: "Pemasaran", src: "/pemasaran.jpg" },
  { id: 8, name: "Dr.", role: "Pemasaran", src: "/pemasaran.jpg" },
  { id: 9, name: "Dr.", role: "Pemasaran", src: "/pemasaran.jpg" },
  { id: 10, name: "Dr.", role: "Pemasaran", src: "/pemasaran.jpg" },
  { id: 11, name: "Dr.", role: "Pemasaran", src: "/pemasaran.jpg" },
];

export default function StrukturPetinggi() {
  const [index, setIndex] = useState(0);

  // auto-slide tiap 3.5 detik
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % executives.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);

  const active = executives[index];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white text-slate-800">
      {/* HEADER */}
      <header className="relative overflow-hidden text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-indigo-100 text-indigo-600">
              <FaHospitalUser className="text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Rumah Sakit Kisah Tanah Air
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Memberikan pelayanan medis terbaik dengan sentuhan kasih, teknologi
            modern, dan profesionalisme tinggi.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('/pattern.svg')] bg-cover bg-center blur-2xl"
        ></motion.div>
      </header>

      {/* VISI MISI + SLIDESHOW */}
      <main className="px-6 pb-20">
        <section className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md border border-slate-100 rounded-3xl shadow-xl p-10 grid md:grid-cols-2 gap-10 items-center">
          {/* VISI & MISI */}
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3 text-left">
              Visi & Misi Rumah Sakit
            </h2>
            <p className="text-slate-500 mb-5">
              Kami berkomitmen memberikan pelayanan kesehatan yang holistik dan
              berlandaskan nilai kemanusiaan.
            </p>
            <ul className="space-y-3 text-slate-600 list-disc pl-6">
              <li>
                Menjadi rumah sakit unggulan nasional berstandar internasional.
              </li>
              <li>Mengutamakan keselamatan dan kenyamanan pasien.</li>
              <li>Mengembangkan SDM profesional dan berintegritas.</li>
              <li>Menerapkan teknologi modern untuk efisiensi pelayanan.</li>
            </ul>
          </div>

          {/* SLIDE FOTO PETINGGI */}
          <div className="relative flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 ring-4 ring-indigo-100 shadow-lg">
                  <img
                    src={active.src}
                    alt={active.name}
                    className="w-full h-full object-cover"
                    onError={(ev) => (ev.currentTarget.style.display = "none")}
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  {active.name}
                </h3>
                <p className="text-slate-500">{active.role}</p>
              </motion.div>
            </AnimatePresence>

            {/* indikator bawah */}
            <div className="flex gap-2 mt-6">
              {executives.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === index ? "bg-indigo-500" : "bg-slate-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-100">
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-600 font-medium">
          Rumah Sakit Kisah Tanah Air
        </span>{" "}
        — Semua hak dilindungi.
      </footer>
    </div>
  );
}
