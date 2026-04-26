import { useLocale } from "@/context/LocaleContext";
import { LeadForm } from "@/components/forms/LeadForm";
import { SEO } from "@/components/site/SiteLayout";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Contact() {
  const { t, locale } = useLocale();
  return (
    <>
      <SEO title={`${t.contact.title} — Auto Odesa`} description={t.contact.sub} />
      <section className="bg-primary text-white">
        <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold">{t.contact.title}</h1>
          <p className="mt-3 text-white/70 max-w-2xl">{t.contact.sub}</p>
        </div>
      </section>
      <div className="container-px mx-auto max-w-7xl py-10 grid lg:grid-cols-[1fr_440px] gap-8">
        <div className="space-y-5">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-cta mt-0.5" /><div><p className="text-xs text-muted-foreground uppercase tracking-wide">Address</p><p className="text-sm font-medium">{t.contact.address}</p></div></div>
            <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-cta mt-0.5" /><div><p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p><a className="text-sm font-medium hover:text-cta" href="tel:+380480000000">+380 48 000 0000</a></div></div>
            <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-cta mt-0.5" /><div><p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p><a className="text-sm font-medium hover:text-cta" href="mailto:hello@autoodesa.ua">hello@autoodesa.ua</a></div></div>
            <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-cta mt-0.5" /><div><p className="text-xs text-muted-foreground uppercase tracking-wide">Hours</p><p className="text-sm font-medium">{t.contact.hours}</p></div></div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border shadow-card aspect-[16/9] bg-muted">
            <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=30.6%2C46.42%2C30.85%2C46.55&amp;layer=mapnik" className="w-full h-full" loading="lazy" />
          </div>
        </div>
        <aside className="bg-card rounded-xl border border-border p-6 shadow-card lg:sticky lg:top-20 lg:self-start">
          <h2 className="font-semibold text-lg mb-1">{t.contact.ctaManager}</h2>
          <LeadForm leadType="contact" fields={[
            { name: "name", label: t.common.name, required: true },
            { name: "phone", label: t.common.phone, type: "tel", required: true },
            { name: "email", label: t.common.email, type: "email" },
            { name: "reason", label: t.contact.reasonLabel, type: "select", defaultValue: "general", options: [
              { value: "test", label: t.contact.reasonTest },
              { value: "financing", label: t.contact.reasonFin },
              { value: "trade", label: t.contact.reasonTrade },
              { value: "availability", label: t.contact.reasonAvail },
              { value: "sell", label: t.contact.reasonSell },
              { value: "general", label: t.contact.reasonGeneral },
            ]},
            { name: "preferredLanguage", label: t.common.preferredLanguage, type: "select", defaultValue: locale, options: [
              { value: "en", label: t.common.english }, { value: "uk", label: t.common.ukrainian },
            ]},
            { name: "message", label: t.common.message, type: "textarea", full: true },
          ]} />
        </aside>
      </div>
    </>
  );
}
