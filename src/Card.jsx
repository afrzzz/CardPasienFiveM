import { useLocation } from "react-router-dom";

export default function Card() {
  const query = new URLSearchParams(useLocation().search);
  const nama = query.get("nama") || "Nama Pasien";
  const ttl = query.get("ttl") || "TTL";
  const nomor = query.get("nomor") || "XXXXXX";
  const status = query.get("status") || "Status";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-600 p-6">
      <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 rounded-xl shadow-lg text-white w-96 h-56 p-6 flex flex-col justify-between">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">Kartu Pasien</h3>
          <span className="text-sm">🏥 Klinik Sehat</span>
        </div>
        <div>
          <p className="tracking-wide text-sm mb-2">Nomor: {nomor}</p>
          <p className="font-semibold">{nama}</p>
          <p className="text-sm">{ttl}</p>
        </div>
        <div className="text-right text-sm font-semibold">{status}</div>
      </div>
    </div>
  );
}
