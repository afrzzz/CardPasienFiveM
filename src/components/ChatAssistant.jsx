import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

// 🔐 Ambil semua API key dari .env dengan proteksi
let API_KEYS = [];

// Coba ambil isi environment variable
const rawEnvKeys = import.meta.env.VITE_GOOGLE_AI_API_KEY;

if (!rawEnvKeys) {
  console.warn(
    "⚠️  Tidak menemukan variabel VITE_GOOGLE_AI_API_KEY di .env — pastikan file .env ada di root project dan sudah di-restart server (npm run dev)."
  );
} else {
  API_KEYS = rawEnvKeys
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);

  if (API_KEYS.length === 0) {
    console.warn("⚠️  Variabel .env ditemukan tapi kosong!");
  }
}

if (API_KEYS.length === 0) {
  // Default biar gak crash, meskipun gak bisa konek ke AI
  API_KEYS = ["INVALID_KEY_PLACEHOLDER"];
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `**Yo! Gue KiTA Bot Curhat** 😎  
Bukan dokter, tapi siap dengerin lo curhat atau tanya soal kesehatan.  
Kalo butuh yang serius banget, **cus ke RS ya.**  
Cari **Bu Lora**, dia ramah banget kok 😄`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiIndex, setApiIndex] = useState(0); // key aktif
  const messagesEndRef = useRef(null);

  const getModel = () => {
    const key = API_KEYS[apiIndex];
    const genAI = new GoogleGenerativeAI(key);
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      console.error("Stream error:", err);
      const errorMsg = err.message?.toLowerCase() || "";

      const isQuotaError =
        errorMsg.includes("quota") ||
        errorMsg.includes("exceeded") ||
        errorMsg.includes("api key") ||
        errorMsg.includes("unauthorized");

      // 🔄 Kalau error API key, ganti ke key berikutnya
      if (isQuotaError && apiIndex < API_KEYS.length - 1) {
        const next = apiIndex + 1;
        console.warn(
          `⚠️ API Key #${apiIndex + 1} limit, ganti ke key #${next + 1}`
        );
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
            text: "😅 Semua API key udah limit nih, coba lagi nanti ya!",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 11,
            text: "😅 Ada gangguan nih, coba lagi ya...",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const botMessageId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, text: "", sender: "bot", timestamp: new Date() },
    ]);

    const prompt = `
Kamu adalah Curhat Bot, chatbot gen-z dari Rumah Sakit Kisah Tanah Air.
Gaya bicaramu santai, seperti gen z, agak tengil tapi tetap sopan dan empatik.
Gunakan bahasa anak muda tapi jangan lebay.

User: "${input}"
`;

    await streamBotResponse(prompt, botMessageId);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Tombol chat melayang */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 
             bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 
             text-white p-5 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.6)]
             hover:shadow-[0_0_35px_rgba(99,102,241,0.9)]
             hover:scale-110 transition-all duration-300 flex items-center justify-center"
        whileHover={{ rotate: 8 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={26} className="text-white drop-shadow-sm" />
        ) : (
          <motion.div
            initial={{ scale: 1, opacity: 0.9 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center justify-center"
          >
            <Bot size={26} className="text-white drop-shadow-md" />
          </motion.div>
        )}
      </motion.button>

      {/* Jendela chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="fixed bottom-28 right-6 z-50 w-[90vw] max-w-[400px] md:w-[420px] h-[80vh] max-h-[560px] md:h-[560px] bg-white/70 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex flex-col border border-white/30 font-[Inter] sm:bottom-28 sm:right-6"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 text-white px-5 py-4 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-white/90" />
                <span className="font-semibold tracking-wide text-base">
                  KiTA Bot Curhat
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Area pesan */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gradient-to-b from-white/60 to-gray-50/70 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <motion.div
                    className={`max-w-[80%] px-4 py-2.5 text-[15px] rounded-2xl leading-relaxed whitespace-pre-wrap break-words shadow-md font-[Manrope] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none"
                        : "bg-white/90 text-gray-800 border border-gray-200 rounded-bl-none text-left"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ReactMarkdown>{msg.text || "‎"}</ReactMarkdown>
                  </motion.div>
                  <span
                    className={`text-[11px] mt-1 opacity-70 ${
                      msg.sender === "user"
                        ? "text-right text-gray-200"
                        : "text-left text-gray-500"
                    }`}
                  >
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </motion.div>
              ))}

              {/* Animasi bot ngetik */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="bg-white/70 px-3 py-2 rounded-2xl flex space-x-1 border border-gray-200 shadow-sm">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 bg-white/90 backdrop-blur-sm p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik sesuatu..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 font-[Inter] shadow-inner"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full hover:shadow-lg disabled:opacity-50 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
