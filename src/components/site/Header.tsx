import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocale } from "@/context/LocaleContext";
import { useFavorites } from "@/context/FavoritesContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLocale();
  const { count } = useFavorites();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/catalog", label: t.nav.buyCar },
    { to: "/catalog?condition=used", label: t.nav.used },
    { to: "/catalog?condition=new", label: t.nav.new },
    { to: "/financing", label: t.nav.financing },
    { to: "/trade-in", label: t.nav.tradeIn },
    { to: "/sell-your-car", label: t.nav.sell },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  const isActive = (to: string) => {
    const path = to.split("?")[0];
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground border-b border-white/10">
      <div className="container-px mx-auto max-w-7xl flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center h-8 w-8 rounded-md bg-cta text-cta-foreground font-bold text-xs">OA</span>
          <span className="font-semibold tracking-tight text-lg">Odesa Auto Select</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0 lg:gap-1 lg:mx-auto">
          {links.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              className={cn(
                "px-2 lg:px-3 py-2 text-[13px] lg:text-sm whitespace-nowrap rounded-md transition-colors text-white/80 hover:text-white hover:bg-white/5",
                isActive(l.to) && "text-white bg-white/10",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto lg:ml-0">
          <LanguageSwitcher variant="dark" />
          <Button asChild variant="ctaOutline" size="sm" className="relative">
            <Link to="/favorites" aria-label={t.nav.favorites}>
              <Heart className="h-4 w-4" />
              {count > 0 && (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-favorite text-white h-5 min-w-5 px-1.5 text-[10px] font-semibold">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild variant="cta" size="sm">
            <Link to="/catalog">{t.nav.headerCta}</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ctaOutline" size="icon" className="lg:hidden ml-auto md:ml-2" aria-label={t.common.open}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] sm:w-96 p-0 bg-primary text-primary-foreground border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-semibold">Odesa Auto Select</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-white/5" aria-label={t.common.close}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-2">
              {links.map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm rounded-md text-white/80 hover:bg-white/5 hover:text-white",
                    isActive(l.to) && "bg-white/10 text-white",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-sm rounded-md text-white/80 hover:bg-white/5 hover:text-white"
              >
                <span className="inline-flex items-center gap-2"><Heart className="h-4 w-4" /> {t.nav.favorites}</span>
                {count > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-favorite text-white h-5 min-w-5 px-1.5 text-[10px] font-semibold">{count}</span>
                )}
              </Link>
            </nav>
            <div className="p-4 border-t border-white/10 space-y-3">
              <LanguageSwitcher variant="dark" className="w-full justify-center" />
              <Button asChild variant="cta" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/catalog">{t.nav.headerCta}</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
