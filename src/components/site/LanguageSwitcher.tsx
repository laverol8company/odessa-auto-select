import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export function LanguageSwitcher({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const { locale, setLocale } = useLocale();
  const dark = variant === "dark";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 text-xs font-medium",
        dark ? "border-white/15 bg-white/5 text-white/80" : "border-border bg-card text-foreground",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Languages className={cn("ml-2 h-3.5 w-3.5", dark ? "text-white/60" : "text-muted-foreground")} aria-hidden />
      {(["en", "uk"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors uppercase tracking-wide",
            locale === l
              ? dark ? "bg-white text-primary" : "bg-primary text-primary-foreground"
              : dark ? "hover:text-white" : "hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
