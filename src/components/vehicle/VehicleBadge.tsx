import { useLocale } from "@/context/LocaleContext";
import type { BadgeKey, Condition } from "@/data/vehicles";
import { cn } from "@/lib/utils";

export function VehicleBadge({ kind }: { kind: BadgeKey }) {
  const { t } = useLocale();
  return (
    <span className="inline-flex items-center rounded-full bg-warning/95 text-primary text-[11px] font-semibold px-2.5 py-1 shadow-card">
      {t.badge[kind]}
    </span>
  );
}

export function ConditionPill({ condition }: { condition: Condition }) {
  const { t } = useLocale();
  const styles: Record<Condition, string> = {
    new: "bg-success/10 text-success border-success/20",
    used: "bg-muted text-muted-foreground border-border",
    certified: "bg-cta/10 text-cta border-cta/20",
    recent: "bg-warning/10 text-[hsl(var(--warning))] border-warning/20",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", styles[condition])}>
      {t.condition[condition]}
    </span>
  );
}
