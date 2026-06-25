import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu as MenuIcon } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Highlandlogo.png";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function Header() {
  const { count } = useCart();

  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setLoggedIn(true);

        const fullName =
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "User";

        setUserName(fullName);
      }
    };

    loadUser();

    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setLoggedIn(true);

          const fullName =
            session.user.user_metadata?.full_name ||
            session.user.email?.split("@")[0] ||
            "User";

          setUserName(fullName);
        } else {
          setLoggedIn(false);
          setUserName("");
        }
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Highlanduef"
            className="h-10 w-auto object-contain"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-display text-3xl font-extrabold text-primary">
              HIGHLANDUEF
            </span>

            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Coffee · Tea · Cake
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            to="/"
            className="text-foreground/80 hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Trang chủ
          </Link>

          <Link
            to="/menu"
            className="text-foreground/80 hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Thực đơn
          </Link>

          <Link
            to="/about"
            className="text-foreground/80 hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Câu chuyện
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {loggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium">
                <User className="size-4" />
                {userName}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link to={"/auth" as any} className="flex items-center gap-2">
                <User className="size-4" />
                Đăng nhập
              </Link>
            </Button>
          )}

          <Button asChild variant="hero" size="sm">
            <Link to="/checkout">
              <ShoppingBag className="size-4" />
              <span>Giỏ ({count})</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Link to="/menu">
              <MenuIcon />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}