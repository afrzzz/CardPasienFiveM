import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Landing from "./components/Landing";
import ComingSoon from "./components/ComingSoon";
import Navbar from "./components/Navbar";
import "./index.css";
import StrukturPetinggi from "./pages/DataPetinggi";
import ProtectedAskes from "./components/protected/ProtectedAskes";
import ProtectedPiagam from "./components/protected/ProtectedPiagam";
import ProtectedSertifikat from "./components/protected/ProtectedSertifikat";
import ResignLetter from "./pages/ResignLetter";
import Piagam from "./pages/Piagam.jsx";
import Sertifikat from "./pages/Sertifikat";
import KpPage from "./pages/KpPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/askes"
        element={
          <ProtectedAskes>
            <App />
          </ProtectedAskes>
        }
      />
      <Route path="/strukturpetinggi" element={<StrukturPetinggi />} />
      <Route
        path="/kp"
        element={
          <ProtectedAskes>
            <KpPage />
          </ProtectedAskes>
        }
      />
      <Route
        path="/surat-resign"
        element={
          <ProtectedAskes>
            <ResignLetter />
          </ProtectedAskes>
        }
      />
      <Route
        path="/piagam"
        element={
          <ProtectedPiagam>
            <Piagam />
          </ProtectedPiagam>
        }
      />
      <Route
        path="/sertifikat"
        element={
          <ProtectedSertifikat>
            <Sertifikat />
          </ProtectedSertifikat>
        }
      />
      <Route path="/sk-kerja" element={<ComingSoon />} />
    </Routes>
  </BrowserRouter>
);
