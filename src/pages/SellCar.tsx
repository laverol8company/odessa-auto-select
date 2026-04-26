import { useLocale } from "@/context/LocaleContext";
import { LeadForm } from "@/components/forms/LeadForm";
import { SEO } from "@/components/site/SiteLayout";

export default function SellCar() {
  const { t } = useLocale();
  return (
    <>
      <SEO title={`${t.sell.title} — Auto Odesa`} description={t.sell.sub} />
      <section className="bg-primary text-white">
        <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold max-w-3xl">{t.sell.title}</h1>
          <p className="mt-3 text-white/70 max-w-2xl">{t.sell.sub}</p>
        </div>
      </section>
      <div className="container-px mx-auto max-w-2xl py-10">
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-card">
          <LeadForm leadType="sell_car" fields={[
            { name: "brand", label: t.common.brand },
            { name: "model", label: t.common.model },
            { name: "year", label: t.common.year, type: "number" },
            { name: "mileage", label: t.common.mileage, type: "number" },
            { name: "condition", label: t.common.condition, full: true },
            { name: "name", label: t.common.name, required: true },
            { name: "phone", label: t.common.phone, type: "tel", required: true },
          ]} submitLabel={t.sell.cta} />
        </div>
      </div>
    </>
  );
}
