import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChat } from "@/context/ChatContext";
import { useLocale, formatPrice, formatNumber } from "@/context/LocaleContext";
import { vehicles, brandList, type Body, type Fuel, type Transmission, type Vehicle } from "@/data/vehicles";
import { MessageCircle, RotateCcw, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "goal" | "budget" | "use" | "body" | "brand" | "fuel" | "trans" | "matched" | "lead" | "success";

interface State {
  goal?: string;
  budget?: [number, number] | null;
  use?: string;
  body?: Body | "any";
  brand?: string | "any";
  fuel?: Fuel | "any";
  trans?: Transmission | "any";
}

const budgets: { key: keyof typeof labels; range: [number, number] | null }[] = [
  { key: "budget1", range: [0, 10000] },
  { key: "budget2", range: [10000, 20000] },
  { key: "budget3", range: [20000, 35000] },
  { key: "budget4", range: [35000, 999999] },
  { key: "budget5", range: null },
];
const labels = { budget1: 1, budget2: 1, budget3: 1, budget4: 1, budget5: 1 } as const;

export function SmartSelectorButton() {
  const { open } = useChat();
  const { t } = useLocale();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={t.chat.open}
      className="hidden md:flex fixed bottom-6 right-6 z-30 items-center gap-2 rounded-full bg-cta hover:bg-cta-hover text-cta-foreground px-5 py-3 shadow-premium font-medium text-sm"
    >
      <MessageCircle className="h-4 w-4" />
      {t.chat.open}
    </button>
  );
}

export function SmartSelector() {
  const { isOpen, close } = useChat();
  const { t, locale } = useLocale();
  const [step, setStep] = useState<Step>("goal");
  const [state, setState] = useState<State>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prefLang, setPrefLang] = useState(locale);
  const [bestTime, setBestTime] = useState("anytime");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // small delay so closing animation reads cleanly
      const id = setTimeout(() => { setStep("goal"); setState({}); setError(null); }, 300);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  const matched = useMemo<Vehicle[]>(() => {
    let list = [...vehicles];
    if (state.budget) {
      const [min, max] = state.budget;
      list = list.filter(v => v.price >= min && v.price <= max);
    }
    if (state.body && state.body !== "any") list = list.filter(v => v.body === state.body);
    if (state.brand && state.brand !== "any") list = list.filter(v => v.brand === state.brand);
    if (state.fuel && state.fuel !== "any") list = list.filter(v => v.fuel === state.fuel);
    if (state.trans && state.trans !== "any") list = list.filter(v => v.transmission === state.trans);
    if (state.use === "use2") list = list.filter(v => v.body === "suv" || v.body === "wagon" || v.body === "sedan");
    if (state.use === "use5") list = list.filter(v => v.fuel === "hybrid" || v.fuel === "electric" || v.fuel === "diesel");
    if (state.use === "use6") list = list.filter(v => v.price >= 35000);
    if (state.use === "use1") list = list.filter(v => v.body === "hatchback" || v.body === "sedan" || v.fuel === "electric");
    return list.slice(0, 4);
  }, [state]);

  const goNext = (next: Step) => { setStep(next); setError(null); };

  const submitLead = () => {
    if (!phone.trim()) { setError(t.form.requiredPhone); return; }
    if (!name.trim()) { setError(t.form.requiredName); return; }
    const lead = {
      leadType: "smart_selector",
      goal: state.goal,
      budget: state.budget,
      use: state.use,
      body: state.body,
      brand: state.brand,
      fuel: state.fuel,
      trans: state.trans,
      matchedSlugs: matched.map(m => m.slug),
      contact: { name, phone, preferredLanguage: prefLang, bestTime },
      locale,
      submittedAt: new Date().toISOString(),
    };
    const all = JSON.parse(localStorage.getItem("leads") ?? "[]");
    all.push(lead); localStorage.setItem("leads", JSON.stringify(all));
    setStep("success");
  };

  const Bubble = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-muted text-foreground rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[90%] animate-fade-in">{children}</div>
  );

  const Choice = ({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" onClick={onClick}
      className={cn("text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors",
        active ? "border-cta bg-cta/5 text-cta" : "border-border bg-card hover:border-foreground/30")}>{children}</button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="p-0 max-w-lg w-[calc(100%-1.5rem)] gap-0 bg-card overflow-hidden">
        <header className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary text-primary-foreground">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center h-8 w-8 rounded-md bg-cta text-cta-foreground"><MessageCircle className="h-4 w-4" /></span>
            <DialogTitle className="text-sm font-semibold">{t.chat.title}</DialogTitle>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => { setState({}); setStep("goal"); }} className="p-1.5 rounded hover:bg-white/10" aria-label={t.chat.restart}><RotateCcw className="h-4 w-4" /></button>
            <button onClick={close} className="p-1.5 rounded hover:bg-white/10" aria-label={t.common.close}><X className="h-4 w-4" /></button>
          </div>
        </header>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
          {step === "goal" && (
            <>
              <Bubble>{t.chat.opening}</Bubble>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  ["buy", t.chat.goalBuy], ["financing", t.chat.goalFin],
                  ["trade", t.chat.goalTrade], ["sell", t.chat.goalSell], ["unsure", t.chat.goalUnsure],
                ].map(([k, label]) => (
                  <Choice key={k} onClick={() => { setState(s => ({ ...s, goal: k })); goNext("budget"); }}>{label}</Choice>
                ))}
              </div>
            </>
          )}

          {step === "budget" && (
            <>
              <Bubble>{t.chat.budgetQ}</Bubble>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {budgets.map((b, i) => {
                  const key = (`budget${i + 1}`) as "budget1" | "budget2" | "budget3" | "budget4" | "budget5";
                  return (
                    <Choice key={key} onClick={() => { setState(s => ({ ...s, budget: b.range })); goNext("use"); }}>{t.chat[key]}</Choice>
                  );
                })}
              </div>
            </>
          )}

          {step === "use" && (
            <>
              <Bubble>{t.chat.useQ}</Bubble>
              <div className="grid grid-cols-2 gap-2">
                {["use1", "use2", "use3", "use4", "use5", "use6"].map(k => (
                  <Choice key={k} onClick={() => { setState(s => ({ ...s, use: k })); goNext("body"); }}>
                    {t.chat[k as "use1"]}
                  </Choice>
                ))}
              </div>
            </>
          )}

          {step === "body" && (
            <>
              <Bubble>{t.chat.bodyQ}</Bubble>
              <div className="grid grid-cols-2 gap-2">
                <Choice onClick={() => { setState(s => ({ ...s, body: "any" })); goNext("brand"); }}>{t.chat.bodyAny}</Choice>
                {(["sedan", "suv", "hatchback", "wagon", "van"] as Body[]).map(b => (
                  <Choice key={b} onClick={() => { setState(s => ({ ...s, body: b })); goNext("brand"); }}>{t.body[b]}</Choice>
                ))}
              </div>
            </>
          )}

          {step === "brand" && (
            <>
              <Bubble>{t.chat.brandQ}</Bubble>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                <Choice onClick={() => { setState(s => ({ ...s, brand: "any" })); goNext("fuel"); }}>{t.chat.brandAny}</Choice>
                {brandList.map(b => (
                  <Choice key={b} onClick={() => { setState(s => ({ ...s, brand: b })); goNext("fuel"); }}>{b}</Choice>
                ))}
              </div>
            </>
          )}

          {step === "fuel" && (
            <>
              <Bubble>{t.chat.fuelQ}</Bubble>
              <div className="grid grid-cols-2 gap-2">
                <Choice onClick={() => { setState(s => ({ ...s, fuel: "any" })); goNext("trans"); }}>{t.chat.fuelAny}</Choice>
                {(["petrol", "diesel", "hybrid", "electric"] as Fuel[]).map(f => (
                  <Choice key={f} onClick={() => { setState(s => ({ ...s, fuel: f })); goNext("trans"); }}>{t.fuel[f]}</Choice>
                ))}
              </div>
            </>
          )}

          {step === "trans" && (
            <>
              <Bubble>{t.chat.transQ}</Bubble>
              <div className="grid grid-cols-3 gap-2">
                <Choice onClick={() => { setState(s => ({ ...s, trans: "any" })); goNext("matched"); }}>{t.chat.transAny}</Choice>
                {(["automatic", "manual"] as Transmission[]).map(tr => (
                  <Choice key={tr} onClick={() => { setState(s => ({ ...s, trans: tr })); goNext("matched"); }}>{t.transmission[tr]}</Choice>
                ))}
              </div>
            </>
          )}

          {step === "matched" && (
            <>
              <Bubble>{matched.length ? t.chat.matched : t.chat.noMatch}</Bubble>
              <div className="space-y-2">
                {matched.map(m => (
                  <Link key={m.slug} to={`/catalog/${m.slug}`} onClick={close}
                    className="flex gap-3 items-center p-2.5 rounded-lg border border-border hover:border-foreground/30">
                    <img src={m.image} alt={`${m.brand} ${m.model}`} loading="lazy" width={120} height={84}
                      className="h-14 w-20 object-cover rounded-md bg-muted" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{m.brand} {m.model}</p>
                      <p className="text-xs text-muted-foreground">{m.year} · {formatNumber(m.mileageKm, locale)} {t.common.km}</p>
                    </div>
                    <p className="text-sm font-semibold whitespace-nowrap">{formatPrice(m.price, locale)}</p>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <Button variant="cta" className="flex-1" onClick={() => goNext("lead")}>{t.chat.sendToManager}</Button>
                <Button variant="outline" className="flex-1" asChild onClick={close}>
                  <Link to="/catalog">{t.chat.showSimilar}</Link>
                </Button>
              </div>
            </>
          )}

          {step === "lead" && (
            <>
              <Bubble>{t.chat.leadQ}</Bubble>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="c-name" className="text-xs">{t.common.name}</Label>
                  <Input id="c-name" value={name} onChange={e => setName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-phone" className="text-xs">{t.common.phone}</Label>
                  <Input id="c-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">{t.common.preferredLanguage}</Label>
                    <Select value={prefLang} onValueChange={(v) => setPrefLang(v as "en" | "uk")}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t.common.english}</SelectItem>
                        <SelectItem value="uk">{t.common.ukrainian}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">{t.common.bestTime}</Label>
                    <Select value={bestTime} onValueChange={setBestTime}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">{t.common.morning}</SelectItem>
                        <SelectItem value="afternoon">{t.common.afternoon}</SelectItem>
                        <SelectItem value="evening">{t.common.evening}</SelectItem>
                        <SelectItem value="anytime">{t.common.anytime}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button variant="cta" className="w-full" onClick={submitLead}>{t.chat.leadCta}</Button>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="rounded-xl border border-success/30 bg-success/5 p-6 text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto text-success" />
              <p className="mt-3 text-sm">{t.chat.leadSuccess}</p>
              <Button variant="outline" className="mt-4" onClick={close}>{t.common.close}</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
