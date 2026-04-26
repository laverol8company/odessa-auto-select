import { useLocale } from "@/context/LocaleContext";
import { SEO } from "@/components/site/SiteLayout";

export default function Privacy() {
  const { t } = useLocale();
  const sections = [
    [t.privacy.s1Title, t.privacy.s1], [t.privacy.s2Title, t.privacy.s2],
    [t.privacy.s3Title, t.privacy.s3], [t.privacy.s4Title, t.privacy.s4],
    [t.privacy.s5Title, t.privacy.s5], [t.privacy.s6Title, t.privacy.s6],
  ] as const;
  return (
    <>
      <SEO title={`${t.privacy.title} — Auto Odesa`} description={t.privacy.title} />
      <div className="container-px mx-auto max-w-3xl py-14">
        <h1 className="text-3xl font-semibold">{t.privacy.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.privacy.updated}</p>
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
