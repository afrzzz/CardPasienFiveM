import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/askes" element={<App />} />
    </Routes>
  </BrowserRouter>
);
