import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  ssr: false,
  head: () => ({ meta: [{ title: "Câu chuyện Highlanduef" }] }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto max-w-3xl flex-1 px-4 py-16">
        <span className="text-xs uppercase tracking-widest text-primary">Câu chuyện</span>
        <h1 className="mt-2 font-display text-4xl font-bold">Highlanduef — Cảm hứng từ cao nguyên</h1>
        <div className="prose mt-6 space-y-4 text-muted-foreground">
          <p>
            Highlanduef được sinh ra từ tình yêu với cà phê phin Việt Nam và menu kinh điển của Highlands Coffee — nơi
            Phin Sữa Đá, Trà Sen Vàng và Freeze Trà Xanh đã trở thành ký ức của hàng triệu người.
          </p>
          <p>
            Chúng tôi mang tinh thần ấy đến không gian Highlanduef của riêng mình: mộc mạc, ấm áp, mọi ly đều được pha
            tay bằng cà phê Robusta cao nguyên và lá trà tươi mỗi ngày.
          </p>
          <p>
            Mỗi ly cà phê là một lát cắt núi rừng — đỏ rực ánh chiều, xanh thẳm rặng thông, vàng óng nắng cuối ngày.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
