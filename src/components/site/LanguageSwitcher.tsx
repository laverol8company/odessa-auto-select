import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export function LanguageSwitcher({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const { locale, setLocale } = useLocale();
  const dark = variant === "dark";
  
  const langs = [
    { code: "en", label: "EN" },
    { code: "ua", label: "UA" },
    { code: "ro", label: "RO" },
  ] as const;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-2xl border p-1 font-medium transition-all duration-300",
        dark ? "border-white/10 bg-white/5 backdrop-blur-md" : "border-border bg-muted/50",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {langs.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code as any)}
          aria-pressed={locale === code}
          className={cn(
            "relative rounded-xl px-3 py-1.5 text-sm transition-all duration-300 active:scale-95 z-10",
            locale === code
              ? dark ? "text-primary shadow-md" : "text-primary-foreground shadow-sm"
              : dark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-black/5",
          )}
        >
          {locale === code && (
            <span 
              className={cn(
                "absolute inset-0 rounded-xl -z-10 transition-all duration-300", 
                dark ? "bg-white" : "bg-primary"
              )} 
            />
          )}
          {label}
        </button>
      ))}
    </div>
  );
}
