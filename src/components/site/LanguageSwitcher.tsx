import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export function LanguageSwitcher({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const { locale, setLocale } = useLocale();
  const dark = variant === "dark";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-1 text-sm font-medium transition-all shadow-sm",
        dark ? "border-white/20 bg-white/5" : "border-border/60 bg-muted/30",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["ro", "uk", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "relative rounded-full px-3 py-1.5 transition-all duration-300 uppercase tracking-widest font-bold text-[11px]",
            locale === l
              ? dark ? "bg-white text-primary shadow-sm" : "bg-primary text-primary-foreground shadow-sm"
              : dark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          )}
        >
          {l === "uk" ? "ua" : l}
        </button>
      ))}
    </div>
  );
}
