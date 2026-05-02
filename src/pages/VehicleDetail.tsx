import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocale, formatPrice, formatNumber } from "@/context/LocaleContext";
import { useFavorites } from "@/context/FavoritesContext";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LeadForm } from "@/components/forms/LeadForm";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { ConditionPill, VehicleBadge } from "@/components/vehicle/VehicleBadge";
import { SEO } from "@/components/site/SiteLayout";
import { ArrowLeft, Calendar, Check, Fuel, Gauge, Heart, MapPin, Settings2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VehicleDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const { t, locale } = useLocale();
  const { isFavorite, toggle } = useFavorites();
  const v = vehicles.find(x => x.slug === slug);
  const [downPct, setDownPct] = useState(20);
  const [term, setTerm] = useState(36);

  const similar = useMemo(() => v ? vehicles.filter(x => x.slug !== v.slug && (x.body === v.body || x.brand === v.brand)).slice(0, 3) : [], [v]);

  if (!v) {
    return (
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="text-2xl font-semibold">404</h1>
        <Button className="mt-6" onClick={() => nav("/catalog")}>{t.detail.backToCatalog}</Button>
      </div>
    );
  }

  const fav = isFavorite(v.slug);
  const down = Math.round(v.price * downPct / 100);
  const principal = v.price - down;
  const monthly = Math.round(principal / term);

  return (
    <>
      <SEO title={`${v.brand} ${v.model} ${v.year} | General cars`} description={v.overview[locale]} />
      <div className="container-px mx-auto max-w-7xl pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />{t.detail.backToCatalog}</Link>
      </div>

      <div className="container-px mx-auto max-w-7xl py-6 pb-32 lg:pb-12 grid lg:grid-cols-[1fr_420px] gap-8">
        <div>
          <div className="rounded-xl overflow-hidden bg-card border border-border shadow-card">
            <div className="relative aspect-[16/10] bg-muted">
              <img src={v.image} alt={`${v.brand} ${v.model} ${v.year}`} className="h-full w-full object-cover" width={1024} height={704} />
              <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                {v.badge && <VehicleBadge kind={v.badge} />}
                <ConditionPill condition={v.condition} />
              </div>
            </div>
          </div>

          <section className="mt-8">
            <h1 className="text-3xl md:text-4xl font-semibold">{v.brand} {v.model}</h1>
            <p className="mt-1 text-muted-foreground">{v.year} · <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{t.detail.available}</span></p>
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { l: t.common.year, v: v.year, i: Calendar },
                { l: t.common.mileage, v: `${formatNumber(v.mileageKm, locale)} ${t.common.km}`, i: Gauge },
                { l: t.common.fuel, v: t.fuel[v.fuel], i: Fuel },
                { l: t.common.transmission, v: t.transmission[v.transmission], i: Settings2 },
              ].map(({ l, v: val, i: Icon }) => (
                <li key={l} className="bg-card rounded-lg border border-border p-3.5 shadow-card">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-[11px] text-muted-foreground mt-2 uppercase tracking-wide">{l}</p>
                  <p className="font-medium text-sm mt-0.5">{val}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t.detail.overviewTitle}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{v.overview[locale]}</p>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{t.detail.overviewCopy}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t.detail.whyTitle}</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {(v.benefits ?? [
                { en: t.detail.benefit1, uk: t.detail.benefit1 },
                { en: t.detail.benefit2, uk: t.detail.benefit2 },
                { en: t.detail.benefit3, uk: t.detail.benefit3 },
                { en: t.detail.benefit4, uk: t.detail.benefit4 },
              ]).map((b, i) => (
                <li key={i} className="flex gap-2.5 text-sm bg-muted/40 border border-border rounded-lg p-3.5">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />{b[locale]}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t.detail.featuresTitle}</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {v.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-cta" />{f[locale]}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="text-xl font-semibold">{t.detail.financeTitle}</h2>
            <p className="text-xs text-muted-foreground mt-1">{t.detail.financeSub}</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-5">
              <div>
                <Label className="text-xs">{t.detail.vehiclePrice}</Label>
                <p className="mt-1 text-lg font-semibold">{formatPrice(v.price, locale)}</p>
              </div>
              <div>
                <Label className="text-xs">{t.common.term}</Label>
                <Select value={String(term)} onValueChange={(s) => setTerm(Number(s))}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[12, 24, 36, 48, 60].map(m => <SelectItem key={m} value={String(m)}>{m} {t.common.months}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between text-xs">
                  <Label>{t.common.downPayment} ({downPct}%)</Label>
                  <span className="font-medium">{formatPrice(down, locale)}</span>
                </div>
                <Slider value={[downPct]} onValueChange={([n]) => setDownPct(n)} min={10} max={60} step={5} className="mt-3" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="text-xs text-muted-foreground">{t.detail.monthly}</p>
                <p className="text-2xl font-semibold mt-0.5">{formatPrice(monthly, locale)}<span className="text-sm text-muted-foreground font-normal">{t.common.perMonth}</span></p>
              </div>
              <Button variant="cta" asChild><Link to={`/financing?car=${v.slug}`}>{t.detail.apply}</Link></Button>
            </div>
          </section>

          <section className="mt-8 rounded-xl bg-gradient-dark text-white p-6 md:p-8">
            <h3 className="text-xl font-semibold">{t.detail.tradeTitle}</h3>
            <p className="text-white/75 mt-1.5 text-sm">{t.detail.tradeSub}</p>
            <Button variant="cta" className="mt-5" asChild><Link to={`/trade-in?next=${v.slug}`}>{t.detail.tradeCta}</Link></Button>
          </section>

          {similar.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-5">{t.detail.similarTitle}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similar.map(s => <VehicleCard key={s.slug} v={s} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.common.price}</p>
            <p className="text-3xl font-semibold mt-1">{formatPrice(v.price, locale)}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="cta" size="lg" asChild><a href="#lead">{t.detail.bookTest}</a></Button>
              <Button variant="dark" size="lg" asChild><a href="#lead">{t.detail.reserve}</a></Button>
              <Button variant="outline" size="lg" asChild className="col-span-2"><Link to={`/financing?car=${v.slug}`}>{t.detail.apply}</Link></Button>
              <Button variant="ghost" size="lg" onClick={() => toggle(v.slug)} className={cn("col-span-2", fav && "text-favorite")}>
                <Heart className={cn("h-4 w-4", fav && "fill-current")} />
                {fav ? t.detail.removeFav : t.detail.saveFav}
              </Button>
            </div>
          </div>

          <div id="lead" className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h3 className="font-semibold text-lg mb-1">{t.detail.leadTitle}</h3>
            <LeadForm
              leadType="vehicle_inquiry"
              selectedCar={`${v.brand} ${v.model} ${v.year}`}
              fields={[
                { name: "name", label: t.common.name, required: true },
                { name: "phone", label: t.common.phone, type: "tel", required: true },
                { name: "requestType", label: t.detail.reqType, type: "select", defaultValue: "test", options: [
                  { value: "test", label: t.detail.reqTest },
                  { value: "reserve", label: t.detail.reqReserve },
                  { value: "financing", label: t.detail.reqFin },
                  { value: "question", label: t.detail.reqQuestion },
                ]},
                { name: "preferredLanguage", label: t.common.preferredLanguage, type: "select", defaultValue: locale, options: [
                  { value: "en", label: t.common.english }, { value: "uk", label: t.common.ukrainian },
                ]},
                { name: "message", label: t.common.message, type: "textarea", full: true },
              ]}
            />
          </div>
        </aside>
      </div>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-20 px-3 pb-3 pointer-events-none">
        <div className="pointer-events-auto rounded-xl bg-primary text-white shadow-premium p-3 flex items-center gap-2">
          <p className="text-xs font-medium px-1 truncate flex-1">{t.detail.stickyTitle}</p>
          <Button size="sm" variant="cta" asChild><a href="#lead">{t.detail.stickyTest}</a></Button>
        </div>
      </div>
    </>
  );
}
