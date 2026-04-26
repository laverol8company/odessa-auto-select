import { Link } from "react-router-dom";
import { useLocale } from "@/context/LocaleContext";
import { useFavorites } from "@/context/FavoritesContext";
import { vehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/site/SiteLayout";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { t, locale } = useLocale();
  const { favorites } = useFavorites();
  const list = vehicles.filter(v => favorites.includes(v.slug));

  return (
    <>
      <SEO title={`${t.favorites.title} — Auto Odesa`} description={t.favorites.sub} />
      <section className="bg-primary text-white">
        <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold">{t.favorites.title}</h1>
          <p className="mt-3 text-white/70 max-w-2xl">{t.favorites.sub}</p>
        </div>
      </section>

      <div className="container-px mx-auto max-w-7xl py-10">
        {list.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center shadow-card max-w-xl mx-auto">
            <Heart className="h-10 w-10 text-muted-foreground mx-auto" />
            <h2 className="mt-4 font-semibold text-lg">{t.favorites.emptyTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.favorites.emptyDesc}</p>
            <Button asChild variant="cta" className="mt-6"><Link to="/catalog">{t.favorites.emptyCta}</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {list.map(v => <VehicleCard key={v.slug} v={v} />)}
            </div>
            <aside className="bg-card rounded-xl border border-border p-6 shadow-card lg:sticky lg:top-20 lg:self-start">
              <h2 className="font-semibold text-lg mb-1">{t.favorites.cta}</h2>
              <LeadForm
                leadType="favorites_inquiry"
                selectedCar={list.map(l => `${l.brand} ${l.model}`).join(", ")}
                fields={[
                  { name: "name", label: t.common.name, required: true },
                  { name: "phone", label: t.common.phone, type: "tel", required: true },
                  { name: "preferredLanguage", label: t.common.preferredLanguage, type: "select", defaultValue: locale, options: [
                    { value: "en", label: t.common.english }, { value: "uk", label: t.common.ukrainian },
                  ]},
                  { name: "message", label: t.common.message, type: "textarea", full: true },
                ]}
              />
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
