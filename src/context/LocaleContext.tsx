import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { translations, type Locale, type Translations } from "@/i18n/translations";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const Ctx = createContext<LocaleCtx | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "en" || stored === "uk") return stored;
    const nav = navigator.language?.toLowerCase() ?? "";
    return nav.startsWith("uk") ? "uk" : "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale: setLocaleState, t: translations[locale] as Translations }),
    [locale],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

export function formatPrice(value: number, locale: Locale) {
  try {
    return new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value.toLocaleString()}`;
  }
}

export function formatNumber(value: number, locale: Locale) {
  try {
    return new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-US").format(value);
  } catch {
    return value.toLocaleString();
  }
}
