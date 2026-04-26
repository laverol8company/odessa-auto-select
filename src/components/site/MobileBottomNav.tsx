import { Link, useLocation } from "react-router-dom";
import { Car, MessageCircle, Heart } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useChat } from "@/context/ChatContext";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { t } = useLocale();
  const { count } = useFavorites();
  const { open } = useChat();
  const { pathname } = useLocation();

  const item = (active: boolean) =>
    cn(
      "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[11px] font-medium",
      active ? "text-cta" : "text-muted-foreground",
    );

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-card border-t border-border shadow-elevated">
      <div className="grid grid-cols-3 max-w-md mx-auto">
        <Link to="/catalog" className={item(pathname.startsWith("/catalog"))}>
          <Car className="h-5 w-5" />
          <span>{t.bottomNav.cars}</span>
        </Link>
        <button type="button" onClick={open} className={item(false)} aria-label={t.bottomNav.help}>
          <MessageCircle className="h-5 w-5" />
          <span>{t.bottomNav.help}</span>
        </button>
        <Link to="/favorites" className={cn(item(pathname === "/favorites"), "relative")}>
          <Heart className="h-5 w-5" />
          <span>{t.bottomNav.favorites}</span>
          {count > 0 && (
            <span className="absolute top-1 right-[28%] inline-flex items-center justify-center rounded-full bg-favorite text-white h-4 min-w-4 px-1 text-[9px] font-semibold">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
