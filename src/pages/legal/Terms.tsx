import { useLocale } from "@/context/LocaleContext";
import { SEO } from "@/components/site/SiteLayout";

export default function Terms() {
  const { t } = useLocale();
  const sections = [
    [t.terms.s1Title, t.terms.s1], [t.terms.s2Title, t.terms.s2],
    [t.terms.s3Title, t.terms.s3], [t.terms.s4Title, t.terms.s4],
    [t.terms.s5Title, t.terms.s5], [t.terms.s6Title, t.terms.s6],
    [t.terms.s7Title, t.terms.s7],
  ] as const;
  return (
    <>
      <SEO title={`${t.terms.title} — Auto Odesa`} description={t.terms.title} />
      <div className="container-px mx-auto max-w-3xl py-14">
        <h1 className="text-3xl font-semibold">{t.terms.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.terms.updated}</p>
        <div className="mt-8 space-y-7">
          {sections.map(([title, body]) => (
            <section key={title}>
              <h2 className="font-semibold text-lg">{title}</h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
