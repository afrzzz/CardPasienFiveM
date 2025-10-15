import React from "react";

export default function PatientForm({
  nama,
  setNama,
  ttl,
  setTtl,
  kelas,
  setKelas,
  rumahSakit,
  setRumahSakit,
  tanggalPembuatan,
  setTanggalPembuatan,
  masaBerlaku,
  isScriptReady,
  handleGenerateLink,
}) {
  const fields = [
    {
      id: "nama",
      label: "Nama Lengkap",
      value: nama,
      set: (v) => setNama(v.slice(0, 18)), // batasi max 18 karakter
      placeholder: "Nama Lengkap (18 Char)",
    },
    {
      id: "ttl",
      label: "Tanggal Lahir",
      value: ttl,
      set: setTtl,
      type: "date",
    },
    {
      id: "instansi",
      label: "Instansi",
      value: kelas,
      set: setKelas,
      type: "select",
      options: ["Kepolisian"],
    },
    {
      id: "rumahSakit",
      label: "Rumah Sakit",
      value: rumahSakit,
      set: setRumahSakit,
      placeholder: "KISAH TANAH AIR",
      disabled: true,
    },
    {
      id: "tanggalPembuatan",
      label: "Tanggal Pembuatan (tekan logo kalender)",
      value: tanggalPembuatan,
      set: setTanggalPembuatan,
      type: "date",
    },
    {
      id: "masaBerlaku",
      label: "Masa Berlaku (otomatis)",
      value: masaBerlaku,
      placeholder: "14 Hari dari Tanggal Pembuatan",
      readOnly: true,
    },
  ];

  return (
    <div
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1f2937",
          marginBottom: "24px",
        }}
      >
        Generator Kartu ASKES
      </h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {fields.map((f) => (
          <div key={f.id}>
            <label
              htmlFor={f.id}
              style={{
                display: "block",
                fontSize: "14px",
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              {f.label}
            </label>

            {f.type === "select" ? (
              <select
                id={f.id}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                style={{
                  width: "100%",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  outline: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.boxShadow = "0 0 0 2px #bbf7d0";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Pilih Instansi</option>
                {f.options?.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.id}
                type={f.type || "text"}
                value={f.value}
                onChange={(e) => (f.set ? f.set(e.target.value) : undefined)} // hanya jalankan kalau ada set()
                placeholder={f.placeholder}
                readOnly={f.readOnly}
                disabled={f.disabled}
                style={{
                  width: "100%",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  outline: "none",
                  transition: "all 0.2s",
                  backgroundColor: f.disabled ? "#f3f4f6" : "white",
                  color: f.disabled ? "#9ca3af" : "black",
                  cursor: f.disabled ? "not-allowed" : "text",
                }}
                onFocus={(e) => {
                  if (!f.readOnly && !f.disabled) {
                    e.target.style.borderColor = "#22c55e";
                    e.target.style.boxShadow = "0 0 0 2px #bbf7d0";
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleGenerateLink}
          style={{
            width: "100%",
            fontWeight: "600",
            padding: "12px",
            borderRadius: "12px",
            marginTop: "8px",
            transition: "all 0.3s",
            transform: "translateY(0)",
            backgroundColor: isScriptReady ? "#16a34a" : "#9ca3af",
            color: "#fff",
            cursor: isScriptReady ? "pointer" : "not-allowed",
            border: "none",
          }}
          disabled={!isScriptReady}
        >
          {isScriptReady ? "Generate Link" : "Memuat pustaka..."}
        </button>
      </form>
    </div>
  );
}
