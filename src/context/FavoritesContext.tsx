import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

interface FavCtx {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
}

const Ctx = createContext<FavCtx | undefined>(undefined);
const KEY = "favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<FavCtx>(() => ({
    favorites,
    isFavorite: (slug) => favorites.includes(slug),
    toggle: (slug) => setFavorites(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]),
    remove: (slug) => setFavorites(prev => prev.filter(s => s !== slug)),
    clear: () => setFavorites([]),
    count: favorites.length,
  }), [favorites]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
