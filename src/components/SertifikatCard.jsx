import { forwardRef } from "react";
import templateBg from "../assets/bg_certificate2.png";
import formatTanggal from "../utils/formatTanggal";

const SertifikatCard = forwardRef(
  (
    { nomorSertifikat, namaPerusahaan, jenisMakanan, tanggalPengesahan },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          aspectRatio: "210/297",
          background: `url(${templateBg}) center/cover no-repeat`,
          fontFamily: "'Poppins', sans-serif",
          color: "#333",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* NOMOR SERTIFIKAT */}
        <div
          style={{
            position: "absolute",
            top: "205px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              margin: 0,
              textTransform: "uppercase",
              color: "#444",
            }}
          >
            {nomorSertifikat || "-"}
          </p>
        </div>

        {/* NAMA PERUSAHAAN */}
        <div
          style={{
            position: "absolute",
            top: "270px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "25px",
              margin: 0,
              textTransform: "uppercase",
              color: "#444",
            }}
          >
            {namaPerusahaan || "Nama Perusahaan"}
          </p>
        </div>

        {/* JENIS MAKANAN */}
        <div
          style={{
            position: "absolute",
            top: "348px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%", // <<< batasi lebar agar wrap terlihat
            textAlign: "center",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "12px",
              whiteSpace: "normal", // <<< penting untuk membolehkan line break
              color: "#444",
            }}
          >
            {jenisMakanan || "Jenis Makanan"}
          </p>
        </div>

        {/* TANGGAL PERPANJANGAN */}
        <div
          style={{
            position: "absolute",
            bottom: "245px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "12px",
              color: "#666",
            }}
          >
            {formatTanggal(tanggalPengesahan) || "Tanggal Perpanjangan"}
          </p>
        </div>
      </div>
    );
  }
);

export default SertifikatCard;
