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

  const desktopLinks = [
    { to: "/catalog", label: t.nav.buyCar },
    { to: "/sell-your-car", label: t.nav.sell },
    { to: "/contact", label: t.nav.contact },
    { to: "/about", label: t.nav.about },
  ];

  const mobileLinks = [
    { to: "/catalog", label: t.nav.buyCar },
    { to: "/sell-your-car", label: t.nav.sell },
    { to: "/favorites", label: t.nav.favorites },
    { to: "/contact", label: t.nav.contact },
    { to: "/about", label: t.nav.about },
  ];

  const isActive = (to: string) => {
    const path = to.split("?")[0];
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground border-b border-white/10 shadow-[0_4px_30px_-10px_rgba(71,142,235,0.15)]">
      <div className="container-px mx-auto max-w-7xl flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="grid place-items-center h-8 w-8 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/20 text-white font-bold text-xs shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:border-white/40 transition-all">GC</span>
          <span className="font-semibold tracking-tight text-lg text-white">General cars</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0 lg:gap-1 lg:mx-auto bg-white/5 rounded-full px-2 py-1 backdrop-blur-md border border-white/10">
          {desktopLinks.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              className={cn(
                "px-3 lg:px-4 py-2 text-[13px] lg:text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300",
                isActive(l.to) 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-white/80 hover:text-white hover:bg-white/10",
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
            <div className="flex items-center p-5 pt-6 pb-4 border-b border-white/10">
              <span className="flex items-center gap-2 shrink-0">
                <span className="grid place-items-center h-8 w-8 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/20 text-white font-bold text-xs">GC</span>
                <span className="font-semibold tracking-tight text-lg text-white">General cars</span>
              </span>
            </div>
            <div className="flex flex-col h-full overflow-y-auto pb-6">
              <nav className="p-4 space-y-2">
                {mobileLinks.map((l) => (
                  <Link
                    key={l.to + l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3.5 text-base rounded-2xl transition-all duration-300 active:scale-95 group",
                      isActive(l.to) 
                        ? "bg-white/15 text-white font-medium shadow-[0_4px_20px_-5px_rgba(255,255,255,0.1)]" 
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {l.to === '/favorites' && <Heart className="mr-3 h-5 w-5 text-white/70 group-hover:text-white transition-colors" />}
                    {l.label}
                    {l.to === '/favorites' && count > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-white text-primary h-5 min-w-5 px-1.5 text-[11px] font-bold shadow-sm">{count}</span>
                    )}
                  </Link>
                ))}
              </nav>
              <div className="p-4 mt-auto space-y-5 border-t border-white/10">
                <LanguageSwitcher variant="dark" className="w-full justify-center py-2.5" />
                <Button asChild variant="cta" className="w-full h-12 text-base font-medium rounded-xl shadow-[0_8px_30px_-5px_rgba(255,255,255,0.2)] active:scale-95 transition-all">
                  <Link to="/catalog" onClick={() => setOpen(false)}>{t.nav.headerCta}</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
