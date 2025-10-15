import React from "react";
import { motion } from "framer-motion";

const dataPetinggi = [
  {
    name: "dr. Andi Pratama, Sp.B",
    role: "Direktur Utama",
    img: "/images/petinggi1.jpg",
  },
  {
    name: "dr. Siti Nurhaliza, M.Kes",
    role: "Wakil Direktur Pelayanan",
    img: "/images/petinggi2.jpg",
  },
  {
    name: "dr. Bambang Wijaya, Sp.PD",
    role: "Kepala Bidang Medis",
    img: "/images/petinggi3.jpg",
  },
  {
    name: "dr. Ratna Dewi, M.Kes",
    role: "Kepala Bidang Administrasi",
    img: "/images/petinggi4.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
  {
    name: "dr. Rudi Hartono, Sp.An",
    role: "Kepala Instalasi Bedah",
    img: "/images/petinggi5.jpg",
  },
];

export default function StrukturPetinggi() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-100 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-10"
      >
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
          Struktur Petinggi Rumah Sakit
        </h1>
        <p className="text-center text-slate-500 mb-12">
          Berikut adalah susunan pimpinan utama Rumah Sakit Kisah Tanah Air.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {dataPetinggi.map((person, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0px 8px 24px rgba(99,102,241,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <div className="w-28 h-28 rounded-full mx-auto overflow-hidden ring-4 ring-indigo-100 mb-4">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-slate-800">{person.name}</h3>
              <p className="text-slate-500 text-sm">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
