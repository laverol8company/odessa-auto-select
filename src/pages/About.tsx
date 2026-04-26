import { useLocale } from "@/context/LocaleContext";
import { SEO } from "@/components/site/SiteLayout";
import { ShieldCheck, Heart, MapPin } from "lucide-react";

export default function About() {
  const { t } = useLocale();
  return (
    <>
      <SEO title={`${t.about.title} — Auto Odesa`} description={t.about.copy} />
      <section className="bg-primary text-white">
        <div className="container-px mx-auto max-w-7xl py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-semibold max-w-3xl tracking-tight">{t.about.title}</h1>
          <p className="mt-5 text-white/75 max-w-2xl leading-relaxed">{t.about.copy}</p>
        </div>
      </section>
      <div className="container-px mx-auto max-w-7xl py-14 grid sm:grid-cols-3 gap-5">
        {[{n:"12+",l:t.about.stat1},{n:"3,500+",l:t.about.stat2},{n:"< 2h",l:t.about.stat3}].map(s => (
          <div key={s.l} className="bg-card border border-border rounded-xl p-7 shadow-card text-center">
            <p className="text-3xl font-semibold">{s.n}</p>
            <p className="text-sm text-muted-foreground mt-1.5">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="container-px mx-auto max-w-7xl pb-16 grid md:grid-cols-3 gap-5">
        {[
          { i: ShieldCheck, t: t.about.val1Title, d: t.about.val1Desc },
          { i: Heart, t: t.about.val2Title, d: t.about.val2Desc },
          { i: MapPin, t: t.about.val3Title, d: t.about.val3Desc },
        ].map(({ i: Icon, t: title, d }) => (
          <div key={title} className="bg-card rounded-xl border border-border p-6 shadow-card">
            <span className="grid place-items-center h-10 w-10 rounded-lg bg-cta/10 text-cta"><Icon className="h-5 w-5" /></span>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </>
  );
}
