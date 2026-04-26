import { Link } from "react-router-dom";
import { Heart, Gauge, Fuel, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, formatPrice, formatNumber } from "@/context/LocaleContext";
import { useFavorites } from "@/context/FavoritesContext";
import type { Vehicle } from "@/data/vehicles";
import { VehicleBadge, ConditionPill } from "./VehicleBadge";
import { cn } from "@/lib/utils";

export function VehicleCard({ v }: { v: Vehicle }) {
  const { t, locale } = useLocale();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(v.slug);
  return (
    <article className="group card-premium flex flex-col">
      <div className="relative aspect-[16/11] overflow-hidden bg-muted">
        <Link to={`/catalog/${v.slug}`} aria-label={`${v.brand} ${v.model}`}>
          <img
            src={v.image}
            alt={`${v.brand} ${v.model} ${v.year}`}
            loading="lazy"
            width={1024}
            height={704}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity pointer-events-none" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {v.badge && <VehicleBadge kind={v.badge} />}
          <ConditionPill condition={v.condition} />
        </div>
        <button
          type="button"
          onClick={() => toggle(v.slug)}
          aria-label={fav ? t.detail.removeFav : t.detail.saveFav}
          aria-pressed={fav}
          className={cn(
            "absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full glass transition-colors",
            fav ? "text-favorite" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Heart className={cn("h-5 w-5", fav && "fill-current")} />
        </button>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-base leading-tight">
              <Link to={`/catalog/${v.slug}`} className="hover:text-cta">{v.brand} {v.model}</Link>
            </h3>
            <p className="text-sm text-muted-foreground">{v.year}</p>
          </div>
          <p className="font-bold text-lg text-cta">{formatPrice(v.price, locale)}</p>
        </div>

        <ul className="grid grid-cols-3 gap-2 text-xs text-muted-foreground border-y border-border py-3">
          <li className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" /> {formatNumber(v.mileageKm, locale)} {t.common.km}</li>
          <li className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5" /> {t.fuel[v.fuel]}</li>
          <li className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" /> {t.transmission[v.transmission]}</li>
        </ul>

        <div className="mt-auto flex gap-2">
          <Button asChild variant="ghost" size="sm" className="flex-1 border border-border hover:bg-muted/50">
            <Link to={`/catalog/${v.slug}`}>{t.card.viewDetails}</Link>
          </Button>
          <Button asChild variant="cta" size="sm" className="flex-1">
            <Link to={`/catalog/${v.slug}#lead`}>{t.card.reserve}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
