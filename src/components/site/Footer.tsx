import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/context/LocaleContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="bg-primary text-white/80 mt-20 pb-24 md:pb-0">
      <div className="container-px mx-auto max-w-7xl py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center h-8 w-8 rounded-md bg-cta text-cta-foreground font-bold">A</span>
            <span className="font-semibold text-white text-lg">Auto Odesa</span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{t.footer.desc}</p>
          <LanguageSwitcher variant="dark" />
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.quickLinks}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalog" className="hover:text-white">{t.nav.buyCar}</Link></li>
            <li><Link to="/favorites" className="hover:text-white">{t.nav.favorites}</Link></li>
            <li><Link to="/about" className="hover:text-white">{t.nav.about}</Link></li>
            <li><Link to="/contact" className="hover:text-white">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.services}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/financing" className="hover:text-white">{t.nav.financing}</Link></li>
            <li><Link to="/trade-in" className="hover:text-white">{t.nav.tradeIn}</Link></li>
            <li><Link to="/sell-your-car" className="hover:text-white">{t.nav.sell}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <h4 className="text-white font-semibold mb-1 text-sm">{t.footer.contact}</h4>
          <p className="text-sm flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {t.contact.address}</p>
          <p className="text-sm flex items-center gap-2"><Phone className="h-4 w-4" /> +380 48 000 0000</p>
          <p className="text-sm flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> {t.contact.hours}</p>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 mt-4">
            <p className="text-white text-sm font-medium mb-2">{t.footer.ctaTitle}</p>
            <Button asChild variant="cta" size="sm">
              <Link to="/contact">{t.footer.ctaBtn}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Auto Odesa. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-white">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
