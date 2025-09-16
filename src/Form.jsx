import { useState } from "react";

const Form = () => {
  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");

  const generateLink = () => {
    const baseUrl = window.location.origin + "/card";
    return `${baseUrl}?nama=${encodeURIComponent(
      nama
    )}&ttl=${encodeURIComponent(ttl)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Input Data Pasien
        </h2>
        <input
          type="text"
          placeholder="Nama"
          className="w-full p-2 border rounded mb-3"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          type="text"
          placeholder="TTL"
          className="w-full p-2 border rounded mb-3"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
        <div className="mt-4 text-center">
          {nama && ttl && (
            <a
              href={generateLink()}
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              {generateLink()}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
