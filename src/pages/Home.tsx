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
import { ShieldCheck, Wallet, Repeat, MapPin, ArrowRight, Search, Heart, Calendar, Car, Sparkles, ChevronRight } from "lucide-react";
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
      <SEO title={`General Cars | ${t.home.heroTitle}`} description={t.home.heroSub} />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative bg-primary text-white overflow-hidden min-h-[580px] md:min-h-[680px] flex items-center">
        {/* Background image */}
        <img src={hero} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" width={1920} height={1080} />
        {/* Subtle moving cinematic gradient over the image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-primary/70 to-blue-900/30 object-cover" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cta/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* Cinematic light sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-showroom-sweep mix-blend-overlay" />
        </div>

        <div className="relative container-px mx-auto max-w-7xl py-20 md:py-32 w-full">
          <div className="max-w-2xl">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-xs font-semibold px-4 py-1.5 mb-8 text-silver tracking-wide uppercase">
              <MapPin className="h-3 w-3 text-cta" />
              {t.tagline}
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.0]">
              <span className="text-gradient-white">{t.home.heroTitle}</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/65 max-w-xl leading-relaxed">
              {t.home.heroSub}
            </p>

            {/* CTA group — premium hierarchy */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="cta" size="xl" className="w-full sm:w-auto bg-cta text-white glow-cta rounded-full font-semibold tracking-tight shadow-[0_0_30px_-5px_rgba(71,142,235,0.4)] transition-all hover:shadow-[0_0_40px_0px_rgba(71,142,235,0.6)]">
                <Link to="/catalog">
                  <Car className="h-4 w-4 mr-2" />
                  {t.home.ctaViewCars}
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" onClick={open} className="w-full sm:w-auto rounded-full bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-md transition-all cursor-pointer">
                <a>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t.home.ctaGetOptions}
                </a>
              </Button>
            </div>

            {/* Trust chips */}
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2.5">
              {[
                { i: ShieldCheck, l: t.home.trust1 },
                { i: Wallet, l: t.home.trust2 },
                { i: Repeat, l: t.home.trust3 },
                { i: MapPin, l: t.home.trust4 },
              ].map(({ i: Icon, l }) => (
                <li key={l} className="flex items-center gap-1.5 text-sm text-white/60">
                  <Icon className="h-3.5 w-3.5 text-cta shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════ QUICK CAR FINDER ══════════════ */}
      <section className="container-px mx-auto max-w-7xl -mt-14 relative z-10">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl font-semibold">{t.home.finderTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t.home.finderSub}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">{t.common.budget}</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
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
              <Label className="text-xs font-medium text-muted-foreground">{t.common.bodyType}</Label>
              <Select value={body} onValueChange={setBody}>
                <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
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
              <Label className="text-xs font-medium text-muted-foreground">{t.home.finderUseCase}</Label>
              <Select value={use} onValueChange={setUse}>
                <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
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
              <Label className="text-xs font-medium text-muted-foreground">{t.common.fuel}</Label>
              <Select value={fuel} onValueChange={setFuel}>
                <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">—</SelectItem>
                  <SelectItem value="petrol">{t.fuel.petrol}</SelectItem>
                  <SelectItem value="diesel">{t.fuel.diesel}</SelectItem>
                  <SelectItem value="hybrid">{t.fuel.hybrid}</SelectItem>
                  <SelectItem value="electric">{t.fuel.electric}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="cta" size="lg" onClick={search} className="lg:self-end col-span-2 lg:col-span-1 rounded-xl glow-cta">
              <Search className="h-4 w-4 shrink-0" />
              {t.home.finderShow}
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURED INVENTORY ══════════════ */}
      <section className="container-px mx-auto max-w-7xl section-y">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cta mb-2">Inventory</p>
            <h2 className="text-2xl md:text-3xl font-bold">{t.home.featuredTitle}</h2>
            <p className="text-muted-foreground mt-1.5 max-w-xl text-sm">{t.home.featuredSub}</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex gap-1 text-cta hover:text-cta">
            <Link to="/catalog">{t.home.viewAll} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(v => <VehicleCard key={v.slug} v={v} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link to="/catalog">{t.home.viewAll}</Link>
          </Button>
        </div>
      </section>

      {/* ══════════════ CHOOSE YOUR PATH ══════════════ */}
      <section className="bg-dark-section text-white relative overflow-hidden">
        <div className="radial-glow-blue absolute inset-0 pointer-events-none" />
        <div className="silver-divider absolute top-0 inset-x-0" />
        <div className="container-px mx-auto max-w-7xl section-y relative">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cta mb-3">Services</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gradient-white">{t.home.pathTitle}</h2>
            <p className="text-white/55 mt-2 max-w-lg mx-auto text-sm">{t.home.pathSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { to: "/catalog", icon: Car, title: t.home.pathBuy, desc: t.home.pathBuyDesc },
              { to: "/financing", icon: Wallet, title: t.home.pathFin, desc: t.home.pathFinDesc },
              { to: "/trade-in", icon: Repeat, title: t.home.pathTrade, desc: t.home.pathTradeDesc },
              { to: "/sell-your-car", icon: ArrowRight, title: t.home.pathSell, desc: t.home.pathSellDesc },
            ] as const).map(({ to, icon: Icon, title, desc }) => (
              <Link key={to} to={to}
                className="group card-dark p-6 flex flex-col gap-4">
                <div className="grid place-items-center h-11 w-11 rounded-2xl bg-cta/10 border border-cta/20 text-cta transition-all group-hover:bg-cta group-hover:border-cta group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-snug">{title}</h3>
                  <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{desc}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs text-cta font-medium group-hover:gap-2 transition-all">
                  {t.common.next} <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="silver-divider absolute bottom-0 inset-x-0" />
      </section>

      {/* ══════════════ SMART ADVISOR PREVIEW ══════════════ */}
      <section className="container-px mx-auto max-w-7xl section-y">
        <div className="relative rounded-3xl bg-primary text-white overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-cta/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cta/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="radial-glow-blue absolute inset-0 pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 md:p-14">
            {/* Left: Text */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-cta/10 text-cta text-xs font-semibold px-3 py-1.5 mb-6 w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                Smart Car Advisor
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gradient-white">
                {t.home.advisorTitle}
              </h2>
              <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
                {t.home.advisorSub}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button onClick={open} variant="cta" size="lg" className="rounded-full glow-cta">
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  {t.home.advisorCta}
                </Button>
                <Button asChild variant="ctaOutline" size="lg" className="rounded-full">
                  <Link to="/contact">{t.home.advisorSecondary}</Link>
                </Button>
              </div>
            </div>

            {/* Right: mock chat UI */}
            <div className="flex items-center justify-center">
              <div className="glass rounded-3xl p-5 w-full max-w-sm space-y-3 shadow-premium">
                {/* Step 1 */}
                <div className="flex gap-3 items-start">
                  <div className="grid place-items-center h-7 w-7 rounded-full bg-gradient-to-tr from-cta to-blue-400 text-white shrink-0">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-white/90 max-w-[80%]">
                    What budget should we work with?
                  </div>
                </div>

                {/* Fake chip selected */}
                <div className="pl-10 flex flex-wrap gap-2">
                  {["$10k–$20k", "$20k–$35k", "$35k+"].map((b, i) => (
                    <span key={b} className={`text-xs px-3 py-1.5 rounded-full border ${i === 1 ? "border-cta bg-cta/20 text-cta" : "border-white/15 text-white/50"}`}>
                      {b}
                    </span>
                  ))}
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 items-start mt-4">
                  <div className="grid place-items-center h-7 w-7 rounded-full bg-gradient-to-tr from-cta to-blue-400 text-white shrink-0">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-white/90 max-w-[80%]">
                    Preferred body type?
                  </div>
                </div>

                {/* Steps label */}
                <div className="pl-10 flex items-center gap-3 text-[10px] text-white/35 mt-2">
                  {[t.home.advisorStep1, t.home.advisorStep2, t.home.advisorStep3].map((s, i) => (
                    <span key={s} className="flex items-center gap-1">
                      {i > 0 && <ChevronRight className="h-2.5 w-2.5" />}
                      <span className={i === 1 ? "text-cta font-semibold" : ""}>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY TRUST US ══════════════ */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-px mx-auto max-w-7xl section-y">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-cta mb-3">Trust</p>
            <h2 className="text-2xl md:text-3xl font-bold">{t.home.trustTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: t.home.trust1Title, d: t.home.trust1Desc, i: ShieldCheck },
              { t: t.home.trust2Title, d: t.home.trust2Desc, i: MapPin },
              { t: t.home.trust3Title, d: t.home.trust3Desc, i: Heart },
            ].map(({ t: title, d, i: Icon }, idx) => (
              <div key={title} className="card-premium p-7 flex flex-col items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[80px] font-bold text-muted/30 leading-none select-none pointer-events-none">
                  0{idx + 1}
                </div>
                <span className="grid place-items-center h-11 w-11 rounded-2xl bg-cta/10 text-cta border border-cta/15">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold text-base">{title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="container-px mx-auto max-w-7xl section-y">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-cta mb-3">What we offer</p>
          <h2 className="text-2xl md:text-3xl font-bold">{t.home.servicesTitle}</h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm">{t.home.servicesSub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { to: "/financing", title: t.home.servicesFinTitle, desc: t.home.servicesFinDesc, icon: Wallet },
            { to: "/trade-in", title: t.home.servicesTradeTitle, desc: t.home.servicesTradeDesc, icon: Repeat },
            { to: "/sell-your-car", title: t.home.servicesSellTitle, desc: t.home.servicesSellDesc, icon: Calendar },
          ].map(({ to, title, desc, icon: Icon }) => (
            <Link key={to} to={to} className="group card-premium p-7 flex flex-col items-start">
              <span className="grid place-items-center h-11 w-11 rounded-2xl bg-primary text-white border border-transparent transition-all group-hover:bg-cta group-hover:border-cta">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
              <span className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-cta group-hover:gap-2 transition-all">
                {t.common.next} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="container-px mx-auto max-w-7xl pb-24">
        <div className="relative rounded-3xl bg-primary text-white p-10 md:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cta/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="silver-divider absolute top-0 inset-x-0" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient-white">{t.home.finalTitle}</h2>
            <p className="mt-3 text-white/60 leading-relaxed text-sm md:text-base">{t.home.finalSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="xl" className="rounded-full glow-cta">
                <Link to="/catalog">
                  <Car className="h-4 w-4 mr-1.5" />
                  {t.home.ctaViewCars}
                </Link>
              </Button>
              <Button variant="ctaOutline" size="xl" onClick={open} className="rounded-full">
                <Sparkles className="h-4 w-4 mr-1.5" />
                {t.home.ctaGetOptions}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
