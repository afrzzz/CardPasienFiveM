import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaTimes,
  FaHospital,
  FaUserMd,
  FaClinicMedical,
  FaAmbulance,
  FaStethoscope,
  FaHeartbeat,
} from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

// 🔐 Ambil semua API key dari .env dengan proteksi
let API_KEYS = [];

// Coba ambil isi environment variable
const rawEnvKeys = import.meta.env.VITE_GOOGLE_AI_API_KEY;

if (!rawEnvKeys) {
  // Silent fail for production - don't show console warnings
  if (import.meta.env.DEV) {
    console.warn("API key not found in environment variables");
  }
} else {
  API_KEYS = rawEnvKeys
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

if (API_KEYS.length === 0) {
  // Default biar gak crash, meskipun gak bisa konek ke AI
  API_KEYS = ["INVALID_KEY_PLACEHOLDER"];
}

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `**Selamat datang di AI Asisten Medis** 🤖

Saya adalah asisten virtual Rumah Sakit Kisah Tanah Air yang siap membantu Anda dengan:

🏥 **Layanan Kesehatan 24 Jam**
👨‍⚕️ **Konsultasi dengan Dokter Spesialis**
🏢 **Informasi Fasilitas Modern**
🚑 **Layanan Darurat & Ambulance**

Silakan ajukan pertanyaan Anda tentang kesehatan atau layanan rumah sakit kami.`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiIndex, setApiIndex] = useState(0); // key aktif
  const messagesEndRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getModel = () => {
    const key = API_KEYS[apiIndex];
    const genAI = new GoogleGenerativeAI(key);
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only auto-scroll for new messages, not on initial load
    if (!isInitialLoad && messages.length > 1) {
      scrollToBottom();
    }
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const streamBotResponse = async (prompt, botMessageId) => {
    let model = getModel();

    try {
      const result = await model.generateContentStream(prompt);
      let streamedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        streamedText += chunkText;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId ? { ...m, text: streamedText } : m
          )
        );
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Stream error:", err);
      }
      const errorMsg = err.message?.toLowerCase() || "";

      const isQuotaError =
        errorMsg.includes("quota") ||
        errorMsg.includes("exceeded") ||
        errorMsg.includes("api key") ||
        errorMsg.includes("unauthorized");

      // 🔄 Kalau error API key, ganti ke key berikutnya
      if (isQuotaError && apiIndex < API_KEYS.length - 1) {
        const next = apiIndex + 1;
        if (import.meta.env.DEV) {
          console.warn(`Switching to API key #${next + 1}`);
        }
        setApiIndex(next);

        // Ulang pakai key baru
        await streamBotResponse(prompt, botMessageId);
        return;
      }

      // 🚫 Kalau semua key habis
      if (apiIndex >= API_KEYS.length - 1) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 10,
            text: "Maaf, layanan sedang sibuk. Silakan coba lagi nanti.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 11,
            text: "Terjadi kesalahan teknis. Silakan coba lagi.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    const botMessageId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, text: "", sender: "bot", timestamp: new Date() },
    ]);

    const prompt = `
Kamu adalah Asisten Virtual RS Kisah Tanah Air (RS KiTA) — AI yang siap bantu warga kota dengan gaya santai tapi tetap sopan dan informatif.

Tugasmu adalah memberikan info seputar layanan medis, jadwal dokter jaga, jenis spesialis, fasilitas rumah sakit, dan prosedur kesehatan di kota.

Gunakan bahasa gaul khas Roleplay, tapi tetap jaga etika dan profesionalitas biar kesannya tetap rumah sakit beneran.

Kalau ada yang nanya hal di luar topik kesehatan atau RP rumah sakit, arahkan balik dengan cara halus dan friendly, contohnya:
"Waduh, kayaknya itu bukan ranah RS KiTA deh~ tapi kalo kamu butuh bantuan medis, aku siap bantuin 💉."

Gaya bahasamu bisa fleksibel — campuran formal dan santai, tapi jangan kaku. Contoh:

"Halo kak! Ada keluhan apa hari ini? Mau aku bantu cek jadwal dokter jaga?"

"Tenang aja, RS KiTA standby 24 jam buat bantu warga kota yang butuh perawatan."

Kamu adalah representasi profesionalisme dengan sentuhan hangat dan humanis dari tim medis RS KiTA di dunia FiveM.

User: "${inputMessage}"
`;

    await streamBotResponse(prompt, botMessageId);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <FaStethoscope className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            AI Asisten Medis
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Konsultasikan kesehatan Anda dengan asisten AI cerdas Rumah Sakit
            Kisah Tanah Air
          </p>
        </motion.div>

        {/* Quick Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              icon: FaHospital,
              label: "24 Jam",
              desc: "Layanan Nonstop",
              color: "from-teal-500 to-emerald-500",
            },
            {
              icon: FaUserMd,
              label: "Spesialis",
              desc: "Dokter Ahli",
              color: "from-emerald-500 to-cyan-500",
            },
            {
              icon: FaClinicMedical,
              label: "Modern",
              desc: "Fasilitas Terkini",
              color: "from-cyan-500 to-teal-500",
            },
            {
              icon: FaAmbulance,
              label: "Darurat",
              desc: "Respon Cepat",
              color: "from-red-500 to-pink-500",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/50 text-center group cursor-pointer hover:shadow-2xl transition-all duration-300`}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="text-white text-xl" />
              </motion.div>
              <h3 className="font-bold text-slate-800 mb-1">{service.label}</h3>
              <p className="text-sm text-slate-600">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl h-[700px] flex flex-col border border-white/50 relative"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.history.back()}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center border border-red-200 transition-colors"
          >
            <FaTimes className="text-red-500" />
          </motion.button>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 pt-16">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`flex gap-4 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white"
                    >
                      <FaRobot className="text-white text-sm" />
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`max-w-lg px-6 py-4 rounded-3xl shadow-lg relative ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border border-slate-200"
                    }`}
                  >
                    {/* Message Tail */}
                    <div
                      className={`absolute top-4 ${
                        message.sender === "user"
                          ? "-right-2 border-l-teal-500"
                          : "-left-2 border-l-slate-200"
                      } w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8`}
                    ></div>

                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown>{message.text || "‎"}</ReactMarkdown>
                    </div>
                    <p
                      className={`text-xs mt-3 ${
                        message.sender === "user"
                          ? "text-teal-100"
                          : "text-slate-500"
                      }`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </motion.div>

                  {message.sender === "user" && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white"
                    >
                      <FaUser className="text-white text-sm" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="flex gap-4 justify-start"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 rounded-3xl shadow-lg border border-slate-200 relative">
                    <div className="absolute top-4 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-200"></div>
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="w-3 h-3 bg-teal-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                        className="w-3 h-3 bg-emerald-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                        className="w-3 h-3 bg-cyan-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="p-8 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 rounded-b-3xl"
          >
            <div className="flex gap-4">
              <motion.input
                whileFocus={{
                  scale: 1.01,
                  boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)",
                }}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanyakan tentang kesehatan atau layanan rumah sakit..."
                className="flex-1 px-6 py-4 rounded-2xl border border-slate-300 focus:border-teal-500 focus:outline-none bg-white shadow-lg text-slate-700 placeholder-slate-400 text-sm"
              />
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(20, 184, 166, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
              >
                <FaPaperPlane className="text-lg mr-2" />
                Kirim
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center mt-8 text-slate-500"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaHeartbeat className="text-red-500 animate-pulse" />
            <span className="text-sm font-medium">
              © {new Date().getFullYear()} Rumah Sakit Kisah Tanah Air
            </span>
            <FaHeartbeat className="text-red-500 animate-pulse" />
          </div>
          <p className="text-xs text-slate-400">Created by Afrzzz</p>
        </motion.div>
      </div>
    </div>
  );
}
