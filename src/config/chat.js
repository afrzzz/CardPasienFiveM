// /api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "edge", // biar cepat di Vercel Edge Function
};

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { prompt, history } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Gunakan streaming agar respon bisa muncul real-time
    const result = await model.generateContentStream([
      `${history}\nUser: ${prompt}\nBot:`,
    ]);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
        } catch (e) {
          controller.enqueue(encoder.encode("⚠️ Terjadi kesalahan di server."));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
