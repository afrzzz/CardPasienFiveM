export default function SertifikatForm({
  nomorSertifikat,
  setNomorSertifikat,
  namaPerusahaan,
  setNamaPerusahaan,
  jenisMakanan,
  setJenisMakanan,
  tanggalPengesahan,
  setTanggalPengesahan,
  isScriptReady,
  handleGenerateLink,
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f9ff, #e0e7ff)",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          color: "#3730a3",
          marginBottom: "20px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Form Sertifikat Halal
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#3730a3",
              marginBottom: "5px",
            }}
          >
            Nomor Sertifikat
          </label>
          <input
            type="text"
            value={nomorSertifikat}
            onChange={(e) => setNomorSertifikat(e.target.value.slice(0, 20))}
            placeholder="Masukkan nomor sertifikat"
            style={{
              width: "100%",
              border: "2px solid #c7d2fe",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "1rem",
              background: "#f8fafc",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#3730a3",
              marginBottom: "5px",
            }}
          >
            Nama Perusahaan
          </label>
          <input
            type="text"
            value={namaPerusahaan}
            onChange={(e) => setNamaPerusahaan(e.target.value.slice(0, 40))}
            placeholder="Masukkan nama perusahaan"
            style={{
              width: "100%",
              border: "2px solid #c7d2fe",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "1rem",
              background: "#f8fafc",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#3730a3",
              marginBottom: "5px",
            }}
          >
            Jenis Makanan
          </label>
          <textarea
            value={jenisMakanan}
            onChange={(e) => setJenisMakanan(e.target.value.slice(0, 174))}
            placeholder="Masukkan jenis makanan"
            rows="3"
            style={{
              width: "100%",
              border: "2px solid #c7d2fe",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "1rem",
              background: "#f8fafc",
              outline: "none",
              transition: "border-color 0.2s",
              resize: "vertical",
              minHeight: "80px",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#3730a3",
              marginBottom: "5px",
            }}
          >
            Tanggal Pengesahan
          </label>
          <input
            type="date"
            value={tanggalPengesahan}
            onChange={(e) => setTanggalPengesahan(e.target.value)}
            style={{
              width: "100%",
              border: "2px solid #c7d2fe",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "1rem",
              background: "#f8fafc",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#c7d2fe")}
          />
        </div>
        <button
          type="button"
          onClick={handleGenerateLink}
          disabled={!isScriptReady}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            background: isScriptReady ? "#f97316" : "#d1d5db",
            border: "none",
            cursor: isScriptReady ? "pointer" : "not-allowed",
            transition: "background 0.2s",
            boxShadow: isScriptReady
              ? "0 4px 10px rgba(249, 115, 22, 0.3)"
              : "none",
          }}
          onMouseOver={(e) => {
            if (isScriptReady) e.target.style.background = "#ea580c";
          }}
          onMouseOut={(e) => {
            if (isScriptReady) e.target.style.background = "#f97316";
          }}
        >
          {isScriptReady ? "🎖️ Generate Sertifikat" : "Memuat pustaka..."}
        </button>
      </form>
    </div>
  );
}
