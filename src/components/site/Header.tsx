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
    { to: "/sell-your-car", label: t.nav.sell },
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
            <div className="flex items-center justify-between p-5 pt-6 pb-4 border-b border-white/10">
              <span className="flex items-center gap-2 shrink-0">
                <span className="grid place-items-center h-8 w-8 rounded-full bg-gradient-to-tr from-white/10 to-white/5 border border-white/20 text-white font-bold text-xs">GC</span>
                <span className="font-semibold tracking-tight text-lg text-white">General cars</span>
              </span>
              <button onClick={() => setOpen(false)} className="p-2 -mr-2 text-white/70 hover:text-white transition-colors" aria-label={t.common.close}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-3 flex flex-col gap-1">
              <Link to="/catalog" onClick={() => setOpen(false)} className={cn("flex items-center px-4 py-3.5 text-[15px] font-medium rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors", isActive("/catalog") && "bg-white/10 text-white")}>
                {t.nav.buyCar}
              </Link>
              <Link to="/sell-your-car" onClick={() => setOpen(false)} className={cn("flex items-center px-4 py-3.5 text-[15px] font-medium rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors", isActive("/sell-your-car") && "bg-white/10 text-white")}>
                {t.nav.sell}
              </Link>
              <Link to="/favorites" onClick={() => setOpen(false)} className="flex items-center justify-between px-4 py-3.5 text-[15px] font-medium rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors">
                <span className="flex items-center gap-2.5"><Heart className="h-4 w-4" /> {t.nav.favorites}</span>
                {count > 0 && <span className="inline-flex items-center justify-center rounded-full bg-favorite text-white h-5 min-w-5 px-1.5 text-[10px] font-bold shadow-sm">{count}</span>}
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)} className={cn("flex items-center px-4 py-3.5 text-[15px] font-medium rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors", isActive("/contact") && "bg-white/10 text-white")}>
                {t.nav.contact}
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className={cn("flex items-center px-4 py-3.5 text-[15px] font-medium rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors", isActive("/about") && "bg-white/10 text-white")}>
                {t.nav.about}
              </Link>
            </nav>
            <div className="p-5 border-t border-white/10 space-y-4">
              <LanguageSwitcher variant="dark" className="w-full justify-center" />
              <Button asChild variant="cta" className="w-full glow-cta rounded-xl py-6" onClick={() => setOpen(false)}>
                <Link to="/catalog">{t.nav.headerCta}</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
