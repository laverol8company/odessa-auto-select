import { useSearchParams } from "react-router-dom";
import { useLocale } from "@/context/LocaleContext";
import { vehicles } from "@/data/vehicles";
import { LeadForm } from "@/components/forms/LeadForm";
import { SEO } from "@/components/site/SiteLayout";

export default function Financing() {
  const { t, locale } = useLocale();
  const [params] = useSearchParams();
  const car = vehicles.find(v => v.slug === params.get("car"));
  const carLabel = car ? `${car.brand} ${car.model} ${car.year}` : "";
  return (
    <>
      <SEO title={`${t.financing.title} — Auto Odesa`} description={t.financing.sub} />
      <section className="bg-primary text-white">
        <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold max-w-3xl">{t.financing.title}</h1>
          <p className="mt-3 text-white/70 max-w-2xl">{t.financing.sub}</p>
        </div>
      </section>
      <div className="container-px mx-auto max-w-2xl py-10">
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card">
          <LeadForm
            leadType="financing"
            selectedCar={carLabel}
            fields={[
              { name: "name", label: t.common.name, required: true },
              { name: "phone", label: t.common.phone, type: "tel", required: true },
              { name: "selectedCar", label: t.common.selectedCar, defaultValue: carLabel, full: true },
              { name: "budget", label: t.common.budget },
              { name: "downPayment", label: t.common.downPayment },
              { name: "preferredLanguage", label: t.common.preferredLanguage, type: "select", defaultValue: locale, options: [
                { value: "en", label: t.common.english }, { value: "uk", label: t.common.ukrainian },
              ]},
              { name: "message", label: t.common.message, type: "textarea", full: true },
            ]}
            submitLabel={t.financing.cta}
          />
        </div>
      </div>
    </>
  );
}
