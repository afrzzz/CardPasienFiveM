export default function formatTanggal(val) {
  if (!val) return "";
  const d = new Date(val);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
