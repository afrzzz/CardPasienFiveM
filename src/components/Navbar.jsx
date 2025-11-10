import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Beranda" },
    {
      label: "Buat Dokumen",
      dropdown: [
        { path: "/askes", label: "Askes Instansi" },
        { path: "/kp", label: "Kartu Pasien Warga" },
        { path: "/surat-resign", label: "Surat Resign" },
        { path: "/piagam", label: "Piagam Penghargaan" },
        { path: "/sertifikat", label: "Sertifikat Pangan" },
        { path: "/sk-kerja", label: "SK Kerja (Coming Soon)" },
      ],
    },
    { path: "/strukturpetinggi", label: "Struktur Petinggi" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 backdrop-blur-lg border-b ${
          scrolled
            ? "bg-white/80 border-sky-100 shadow-md"
            : "bg-white/40 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:py-4">
          {/* LOGO SECTION */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
              className="relative w-12 h-12 rounded-xl bg-[length:200%_200%] bg-gradient-to-r from-sky-400 via-indigo-500 to-blue-600 flex items-center justify-center font-extrabold text-white text-lg shadow-md"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-60"
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
              <span className="relative z-10">KiTA</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-slate-900 font-semibold text-base md:text-lg tracking-wide"
                style={{ textShadow: "0 0 8px rgba(56,189,248,0.25)" }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.9, 1], y: [0, -1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  KISAH TANAH AIR
                </motion.span>
              </motion.h1>
              <p className="text-[11px] text-slate-600/80 italic leading-none">
                Rumah Sakit Umum
              </p>
            </div>
          </motion.div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-6 items-center relative">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;

              if (item.dropdown) {
                return (
                  <motion.div
                    key={item.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        dropdownOpen
                          ? "text-sky-700 bg-sky-100/70 shadow-sm"
                          : "text-slate-700 hover:text-sky-700 hover:bg-sky-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="absolute top-[110%] left-0 w-48 bg-white/90 backdrop-blur-md shadow-md border border-sky-100 rounded-lg overflow-hidden"
                        >
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={`block px-4 py-2 text-sm font-medium transition-all ${
                                location.pathname === sub.path
                                  ? "bg-sky-100 text-sky-700"
                                  : "text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={item.path}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  whileHover={{ y: -2, scale: 1.04 }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-sky-700 bg-sky-100/70 shadow-sm"
                        : "text-slate-700 hover:text-sky-700 hover:bg-sky-50"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-600/70 rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-800 hover:text-sky-700 transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>

      <div className="h-[72px] md:h-[80px]" />

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`fixed top-[72px] left-0 w-full z-40 md:hidden backdrop-blur-2xl border-t border-sky-100 ${
              scrolled ? "bg-white/85 shadow-md" : "bg-white/60"
            }`}
          >
            <div className="flex flex-col items-start px-6 py-5 gap-2">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label} className="w-full">
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === item.label ? null : item.label
                          )
                        }
                        className="w-full flex justify-between items-center px-4 py-3 rounded-md font-medium text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            dropdownOpen === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {dropdownOpen === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col pl-6"
                          >
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => setMenuOpen(false)}
                                className="py-2 text-sm text-slate-600 hover:text-sky-700 transition"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full px-4 py-3 rounded-md font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-sky-100 text-sky-800"
                        : "text-slate-700 hover:bg-sky-50 hover:text-sky-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
