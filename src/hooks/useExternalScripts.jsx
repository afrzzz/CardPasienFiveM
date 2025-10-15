import { useEffect, useState } from "react";

export default function useExternalScripts() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (
      typeof window.Swal !== "undefined" &&
      typeof window.html2canvas !== "undefined"
    ) {
      setIsReady(true);
      return;
    }

    const swalScript = document.createElement("script");
    swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    swalScript.onload = () => {
      const h2cScript = document.createElement("script");
      h2cScript.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
      h2cScript.onload = () => {
        setIsReady(true);
      };
      document.head.appendChild(h2cScript);
    };
    document.head.appendChild(swalScript);
  }, []);

  return isReady;
}
