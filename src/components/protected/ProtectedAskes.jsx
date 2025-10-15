import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import Swal from "sweetalert2";

export default function ProtectedAskes({ children }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const PASSWORD_BENAR = "MEDICKITA2";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading spinner

    setTimeout(() => {
      if (password === PASSWORD_BENAR) {
        Swal.fire({
          icon: "success",
          title: "Akses Diterima",
          text: "Selamat datang di halaman Askes!",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsAuthenticated(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Sandi Salah",
          text: "Silakan coba lagi",
        });
      }
      setLoading(false);
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80 border border-sky-100"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="p-3 bg-sky-500 rounded-full shadow-md"
            >
              <Lock className="text-white" size={24} />
            </motion.div>
          </div>

          <h2 className="text-lg font-semibold text-center text-slate-800 mb-2">
            Halaman Terproteksi
          </h2>
          <p className="text-center text-sm text-slate-600 mb-4">
            Masukkan sandi untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-600 hover:text-sky-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition flex justify-center"
            >
              {loading ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Masuk"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
