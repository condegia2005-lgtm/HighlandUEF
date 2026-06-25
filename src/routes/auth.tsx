import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Đăng nhập — Highlanduef" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the user lands here after clicking the email confirmation link,
    // finalize the session from the URL before checking the current user.
    // This ensures users who confirm via email are signed in automatically.
    const finishSessionFromUrl = async () => {
      try {
        // Supabase client may not expose a getSessionFromUrl method in this SDK version.
        // Fall back to checking the current authenticated user.
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          toast.success('Đăng nhập thành công');
          navigate({ to: '/' });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error checking Supabase user session', err);
      }
    };

    finishSessionFromUrl();
  }, [navigate]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data: signUpData, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            // Redirect back to the auth page so we can finalize the session
            // when the user clicks the confirmation link.
            emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth` : undefined,
          },
        });

        if (error) throw error;

        // If signUp returns a session, the user was created and signed in immediately.
        if (signUpData?.user) {
          toast.success('Đăng ký thành công — bạn đã được đăng nhập');
          navigate({ to: '/' });
          return;
        }

        // Otherwise require email confirmation.
        toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
        setMode('signin');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Đăng nhập thành công");
      navigate({ to: "/" });
    } catch (err) {
      const message = (err as Error).message;
      if (message.toLowerCase().includes("email not confirmed")) {
        toast.error("Email chưa được xác nhận. Vui lòng kiểm tra hộp thư và xác nhận email trước khi đăng nhập.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold">
            {mode === "signin" ? "Đăng nhập tài khoản" : "Tạo tài khoản"}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Đăng nhập để đặt món và theo dõi đơn hàng."
              : "Tạo tài khoản miễn phí để mua hàng nhanh hơn."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Đang xử lý..." : mode === "signin" ? "Đăng nhập" : "Đăng ký"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                Chưa có tài khoản?{" "}
                <button className="font-semibold text-primary" onClick={() => setMode("signup")}>
                  Đăng ký
                </button>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <button className="font-semibold text-primary" onClick={() => setMode("signin")}>
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}