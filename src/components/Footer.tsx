import logo from "@/assets/Highlandlogo.png";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Highlanduef"
              className="h-14 w-auto object-contain"
            />
            <div>
              <div className="font-display text-lg font-bold text-accent">
                HIGHLANDUEF
              </div>
              <div className="text-xs uppercase tracking-widest opacity-70">
                Cà phê · Trà · Bánh
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm opacity-80">
            Gìn giữ tinh thần cà phê Việt — phin đậm, sữa béo, trà sen vàng thanh mát.
            Lấy cảm hứng từ menu Highlands, phục vụ bằng đam mê Highlanduef.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-accent">Liên hệ</div>
          <ul className="space-y-1 text-sm opacity-85">
            <li>1900 1755</li>
            <li>hello@highlanduef.vn</li>
            <li>235 Nguyễn Văn Cừ, Q.5, TP.HCM</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold text-accent">Giờ mở cửa</div>
          <ul className="space-y-1 text-sm opacity-85">
            <li>T2 – T6: 06:30 – 22:30</li>
            <li>T7 – CN: 07:00 – 23:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs opacity-60">
          © {new Date().getFullYear()} Highlanduef Coffee. Cảm hứng từ Highlands Coffee.
        </div>
      </div>
    </footer>
  );
}
