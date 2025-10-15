import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import "./index.css";
import StrukturPetinggi from "./components/DataPetinggi";
import ProtectedAskes from "./components/protected/ProtectedAskes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/askes"
        element={
          <ProtectedAskes>
            {" "}
            <App />{" "}
          </ProtectedAskes>
        }
      />
      <Route path="/strukturpetinggi" element={<StrukturPetinggi />} />
    </Routes>
  </BrowserRouter>
);
