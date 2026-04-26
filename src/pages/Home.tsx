import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/context/LocaleContext";
import { useChat } from "@/context/ChatContext";
import { vehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { SEO } from "@/components/site/SiteLayout";
import { ShieldCheck, Wallet, Repeat, MapPin, ArrowRight, Search, Heart, Calendar } from "lucide-react";
import hero from "@/assets/hero.jpg";

export default function Home() {
  const { t } = useLocale();
  const { open } = useChat();
  const [budget, setBudget] = useState("any");
  const [body, setBody] = useState("any");
  const [use, setUse] = useState("any");
  const [fuel, setFuel] = useState("any");

  const search = () => {
    const params = new URLSearchParams();
    if (budget !== "any") params.set("budget", budget);
    if (body !== "any") params.set("body", body);
    if (fuel !== "any") params.set("fuel", fuel);
    if (use !== "any") params.set("use", use);
    window.location.href = `/catalog?${params.toString()}`;
  };

  const featured = vehicles.slice(0, 6);

  return (
    <>
      <SEO title={`Odesa Auto Select | ${t.home.heroTitle}`} description={t.home.heroSub} />
      {/* Hero */}
      <section className="relative bg-primary text-white overflow-hidden">
        <img src={hero} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cta/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="relative container-px mx-auto max-w-7xl py-14 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-medium px-3 py-1.5 mb-6">
              <MapPin className="h-3.5 w-3.5" /> {t.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">{t.home.heroTitle}</h1>
            <p className="mt-5 text-base md:text-lg text-white/75 max-w-2xl leading-relaxed">{t.home.heroSub}</p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              <Button asChild variant="cta" size="xl" className="w-full sm:w-auto shadow-none glow-cta"><Link to="/catalog">{t.home.ctaViewCars}</Link></Button>
              <Button variant="ctaOutline" size="xl" onClick={open} className="w-full sm:w-auto">{t.home.ctaGetOptions}</Button>
            </div>
            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                { i: ShieldCheck, l: t.home.trust1 },
                { i: Wallet, l: t.home.trust2 },
                { i: Repeat, l: t.home.trust3 },
                { i: MapPin, l: t.home.trust4 },
              ].map(({ i: Icon, l }) => (
                <li key={l} className="flex items-center gap-2 text-white/80"><Icon className="h-4 w-4 text-cta" />{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quick finder */}
      <section className="container-px mx-auto max-w-7xl -mt-12 relative z-10 mb-8 md:mb-16">
        <div className="glass rounded-3xl p-5 md:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cta/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-end gap-5 md:gap-4">
            <div className="md:flex-1">
              <h2 className="text-xl md:text-2xl font-semibold">{t.home.finderTitle}</h2>
              <p className="text-sm text-muted-foreground mt-1">{t.home.finderSub}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <Label className="text-xs">{t.common.budget}</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">—</SelectItem>
                  <SelectItem value="0-15000">$0 – $15,000</SelectItem>
                  <SelectItem value="15000-25000">$15,000 – $25,000</SelectItem>
                  <SelectItem value="25000-40000">$25,000 – $40,000</SelectItem>
                  <SelectItem value="40000-99999">$40,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">{t.common.bodyType}</Label>
              <Select value={body} onValueChange={setBody}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">—</SelectItem>
                  <SelectItem value="sedan">{t.body.sedan}</SelectItem>
                  <SelectItem value="suv">{t.body.suv}</SelectItem>
                  <SelectItem value="hatchback">{t.body.hatchback}</SelectItem>
                  <SelectItem value="wagon">{t.body.wagon}</SelectItem>
                  <SelectItem value="van">{t.body.van}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">{t.home.finderUseCase}</Label>
              <Select value={use} onValueChange={setUse}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">—</SelectItem>
                  <SelectItem value="city">{t.chat.use1}</SelectItem>
                  <SelectItem value="family">{t.chat.use2}</SelectItem>
                  <SelectItem value="trips">{t.chat.use4}</SelectItem>
                  <SelectItem value="economy">{t.chat.use5}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">{t.common.fuel}</Label>
              <Select value={fuel} onValueChange={setFuel}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">—</SelectItem>
                  <SelectItem value="petrol">{t.fuel.petrol}</SelectItem>
                  <SelectItem value="diesel">{t.fuel.diesel}</SelectItem>
                  <SelectItem value="hybrid">{t.fuel.hybrid}</SelectItem>
                  <SelectItem value="electric">{t.fuel.electric}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="cta" size="lg" onClick={search} className="lg:self-end col-span-2 lg:col-span-1">
              <Search className="h-4 w-4" />{t.home.finderShow}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-px mx-auto max-w-7xl section-y">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">{t.home.featuredTitle}</h2>
            <p className="text-muted-foreground mt-1.5 max-w-xl">{t.home.featuredSub}</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/catalog">{t.home.viewAll} <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(v => <VehicleCard key={v.slug} v={v} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline"><Link to="/catalog">{t.home.viewAll}</Link></Button>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container-px mx-auto max-w-7xl section-y">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">{t.home.howTitle}</h2>
            <p className="text-muted-foreground mt-2">{t.home.howSub}</p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: Search, l: t.home.how1 },
              { i: Wallet, l: t.home.how2 },
              { i: Heart, l: t.home.how3 },
              { i: Calendar, l: t.home.how4 },
            ].map(({ i: Icon, l }, idx) => (
              <li key={l} className="card-premium p-6 opacity-90 hover:opacity-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="grid place-items-center h-10 w-10 rounded-lg bg-cta/10 text-cta"><Icon className="h-5 w-5" /></span>
                  <span className="text-xs font-semibold text-muted-foreground">0{idx + 1}</span>
                </div>
                <p className="font-medium leading-snug">{l}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="container-px mx-auto max-w-7xl section-y">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold">{t.home.servicesTitle}</h2>
          <p className="text-muted-foreground mt-2">{t.home.servicesSub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { to: "/financing", title: t.home.servicesFinTitle, desc: t.home.servicesFinDesc, icon: Wallet },
            { to: "/trade-in", title: t.home.servicesTradeTitle, desc: t.home.servicesTradeDesc, icon: Repeat },
            { to: "/sell-your-car", title: t.home.servicesSellTitle, desc: t.home.servicesSellDesc, icon: Calendar },
          ].map(({ to, title, desc, icon: Icon }) => (
            <Link key={to} to={to} className="group card-premium p-7 flex flex-col items-start border-l-4 border-l-transparent hover:border-l-cta bg-gradient-to-br hover:from-card hover:to-muted/30">
              <span className="grid place-items-center h-11 w-11 rounded-lg bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
              <span className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-cta group-hover:gap-2 transition-all">{t.common.next} <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-muted/40 border-y border-border">
        <div className="container-px mx-auto max-w-7xl section-y">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">{t.home.trustTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: t.home.trust1Title, d: t.home.trust1Desc, i: ShieldCheck },
              { t: t.home.trust2Title, d: t.home.trust2Desc, i: MapPin },
              { t: t.home.trust3Title, d: t.home.trust3Desc, i: Heart },
            ].map(({ t: title, d, i: Icon }) => (
              <div key={title} className="card-premium p-6 flex flex-col items-start">
                <span className="grid place-items-center h-10 w-10 rounded-lg bg-success/10 text-success"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-px mx-auto max-w-7xl section-y">
        <div className="relative rounded-3xl bg-gradient-glass text-white p-10 md:p-16 shadow-premium overflow-hidden border border-white/10 glass">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cta/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t.home.finalTitle}</h2>
            <p className="mt-3 text-white/75 leading-relaxed">{t.home.finalSub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="xl"><Link to="/catalog">{t.home.ctaViewCars}</Link></Button>
              <Button variant="ctaOutline" size="xl" onClick={open}>{t.home.ctaGetOptions}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
