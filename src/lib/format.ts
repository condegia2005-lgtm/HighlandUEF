export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export const formatDate = (s: string) =>
  new Date(s).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
