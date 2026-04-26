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
import { MessageCircle, RotateCcw, X, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "goal" | "budget" | "use" | "body" | "brand" | "fuel" | "trans" | "matched" | "lead" | "success";

const STEP_SEQUENCE = ["goal", "budget", "use", "body", "brand", "fuel", "trans"];

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
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-cta text-white px-5 py-3 glow-cta font-medium text-sm transition-all hover:scale-105 active:scale-95"
    >
      <Sparkles className="h-4 w-4" />
      {t.chat.open}
    </button>
  );
}

export function SmartSelector() {
  const { isOpen, close } = useChat();
  const { t, locale } = useLocale();
  const [step, setStep] = useState<Step>("goal");
  const [state, setState] = useState<State>({});
  
  // Lead form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prefLang, setPrefLang] = useState(locale);
  const [bestTime, setBestTime] = useState("anytime");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
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

  const similar = useMemo<Vehicle[]>(() => {
    if (matched.length > 0) return [];
    let pool = [...vehicles];
    if (state.budget) {
      const [min, max] = state.budget;
      const byBudget = pool.filter(v => v.price >= min && v.price <= max);
      if (byBudget.length > 0) pool = byBudget;
    }
    if (state.body && state.body !== "any") {
      const byBody = pool.filter(v => v.body === state.body);
      if (byBody.length > 0) pool = byBody;
    }
    if (state.fuel && state.fuel !== "any") {
      const byFuel = pool.filter(v => v.fuel === state.fuel);
      if (byFuel.length > 0) pool = byFuel;
    }
    return pool.slice(0, 3);
  }, [matched, state]);

  const goNext = (next: Step) => { setStep(next); setError(null); };

  const submitLead = () => {
    if (!phone.trim()) { setError(t.form.requiredPhone); return; }
    if (!name.trim()) { setError(t.form.requiredName); return; }
    // local save mocked
    setStep("success");
  };

  const stepIndex = STEP_SEQUENCE.indexOf(step);
  const progressPercent = stepIndex >= 0 ? Math.round(((stepIndex + 1) / STEP_SEQUENCE.length) * 100) : 100;

  const Bubble = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-3 items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid place-items-center shrink-0 h-8 w-8 rounded-full bg-gradient-to-tr from-cta to-blue-400 text-white shadow-sm">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="bg-muted/60 backdrop-blur text-foreground rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-[85%] border border-border shadow-sm">
        {children}
      </div>
    </div>
  );

  const Choice = ({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" onClick={onClick}
      className={cn("w-full text-left px-5 py-3.5 rounded-full border text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-3 duration-500",
        active ? "border-cta bg-cta/10 text-cta" : "border-border/60 bg-background/50 hover:bg-muted/50 hover:border-border")}>
      {children}
    </button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="p-0 max-w-md w-[calc(100%-1.5rem)] gap-0 backdrop-blur-2xl bg-black/60 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
        <header className="relative px-6 py-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-base font-semibold">{t.chat.title}</DialogTitle>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => { setState({}); setStep("goal"); }} className="grid place-items-center h-8 w-8 rounded-full border border-border hover:bg-muted/50 transition-colors" aria-label={t.chat.restart}><RotateCcw className="h-3.5 w-3.5 text-muted-foreground" /></button>
              <button onClick={close} className="grid place-items-center h-8 w-8 rounded-full border border-border hover:bg-muted/50 transition-colors" aria-label={t.common.close}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
            </div>
          </div>
          {stepIndex >= 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                <span>Step {stepIndex + 1} of {STEP_SEQUENCE.length}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-cta transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}
        </header>

        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 scroll-smooth bg-transparent">
          {step === "goal" && (
            <>
              <Bubble>{t.chat.opening}</Bubble>
              <div className="space-y-2 mt-4">
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
              <div className="space-y-2 mt-4">
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
              <div className="space-y-2 mt-4">
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
              <div className="space-y-2 mt-4">
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
              <div className="grid grid-cols-2 gap-2 mt-4 max-h-64 overflow-y-auto pr-1">
                <button type="button" onClick={() => { setState(s => ({ ...s, brand: "any" })); goNext("fuel"); }}
                  className="col-span-2 text-left px-5 py-3.5 rounded-full border border-border/60 bg-background/50 text-sm font-medium hover:bg-muted/50 mb-2">{t.chat.brandAny}</button>
                {brandList.map(b => (
                  <button type="button" key={b} onClick={() => { setState(s => ({ ...s, brand: b })); goNext("fuel"); }}
                    className="text-left px-4 py-2.5 rounded-full border border-border/60 bg-background/50 text-sm hover:bg-muted/50">{b}</button>
                ))}
              </div>
            </>
          )}

          {step === "fuel" && (
            <>
              <Bubble>{t.chat.fuelQ}</Bubble>
              <div className="space-y-2 mt-4">
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
              <div className="space-y-2 mt-4">
                <Choice onClick={() => { setState(s => ({ ...s, trans: "any" })); goNext("matched"); }}>{t.chat.transAny}</Choice>
                {(["automatic", "manual"] as Transmission[]).map(tr => (
                  <Choice key={tr} onClick={() => { setState(s => ({ ...s, trans: tr })); goNext("matched"); }}>{t.transmission[tr]}</Choice>
                ))}
              </div>
            </>
          )}

          {step === "matched" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Bubble>{matched.length ? t.chat.matched : t.chat.noMatch}</Bubble>
              <div className="space-y-3 mt-6">
                {matched.length > 0 && matched.map(m => (
                  <Link key={m.slug} to={`/catalog/${m.slug}`} onClick={close}
                    className="group card-premium p-3 flex gap-4 items-center">
                    <img src={m.image} alt={m.model} className="h-16 w-24 object-cover rounded-xl bg-muted" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate group-hover:text-cta transition-colors">{m.brand} {m.model}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.year} · {formatNumber(m.mileageKm, locale)} {t.common.km}</p>
                    </div>
                    <p className="text-sm font-bold text-cta whitespace-nowrap">{formatPrice(m.price, locale)}</p>
                  </Link>
                ))}
                {matched.length === 0 && similar.length > 0 && (
                  <>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground ml-1">{t.chat.similarTitle}</p>
                    {similar.map(m => (
                      <Link key={m.slug} to={`/catalog/${m.slug}`} onClick={close}
                        className="group card-premium p-3 flex gap-4 items-center border-[1.5px] border-transparent hover:border-cta/30">
                        <img src={m.image} alt={m.model} className="h-16 w-24 object-cover rounded-xl bg-muted" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate group-hover:text-cta transition-colors">{m.brand} {m.model}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.year} · {formatNumber(m.mileageKm, locale)} {t.common.km}</p>
                        </div>
                        <p className="text-sm font-bold text-cta whitespace-nowrap">{formatPrice(m.price, locale)}</p>
                      </Link>
                    ))}
                  </>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button variant="cta" size="lg" className="flex-1 shadow-none glow-cta rounded-full" onClick={() => goNext("lead")}>{t.chat.sendToManager}</Button>
                <Button variant="outline" size="lg" className="flex-1 rounded-full" asChild onClick={close}>
                  <Link to="/catalog">{t.chat.showSimilar}</Link>
                </Button>
              </div>
            </div>
          )}

          {step === "lead" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Bubble>{t.chat.leadQ}</Bubble>
              <div className="space-y-4 mt-6 bg-card/60 p-5 rounded-2xl border border-border">
                <div>
                  <Label htmlFor="c-name" className="text-xs ml-1">{t.common.name}</Label>
                  <Input id="c-name" value={name} onChange={e => setName(e.target.value)} className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="c-phone" className="text-xs ml-1">{t.common.phone}</Label>
                  <Input id="c-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1.5 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs ml-1">{t.common.preferredLanguage}</Label>
                    <Select value={prefLang} onValueChange={(v) => setPrefLang(v as "en" | "uk")}>
                      <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t.common.english}</SelectItem>
                        <SelectItem value="uk">{t.common.ukrainian}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs ml-1">{t.common.bestTime}</Label>
                    <Select value={bestTime} onValueChange={setBestTime}>
                      <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">{t.common.morning}</SelectItem>
                        <SelectItem value="afternoon">{t.common.afternoon}</SelectItem>
                        <SelectItem value="evening">{t.common.evening}</SelectItem>
                        <SelectItem value="anytime">{t.common.anytime}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {error && <p className="text-sm text-destructive px-1">{error}</p>}
                <Button variant="cta" size="lg" className="w-full rounded-full glow-cta mt-2" onClick={submitLead}>{t.chat.leadCta}</Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-500">
              <div className="grid place-items-center h-20 w-20 rounded-full bg-success/10 mb-6">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{t.chat.leadSuccess}</h3>
              <p className="mt-2 text-muted-foreground text-sm max-w-[250px] mx-auto">We will contact you shortly using your preferred method.</p>
              <Button variant="outline" className="mt-8 rounded-full px-8" onClick={close}>{t.common.close}</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
