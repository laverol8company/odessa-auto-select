import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLocale } from "@/context/LocaleContext";
import { useChat } from "@/context/ChatContext";
import { vehicles, brandList, type Body, type Fuel, type Transmission, type Condition } from "@/data/vehicles";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { SEO } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";

export interface Filters {
  brand: string; model: string; year: string; mileageMax: string;
  priceMin: string; priceMax: string;
  trans: Transmission | "any"; fuel: Fuel | "any"; body: Body | "any"; condition: Condition | "any";
  newOrUsed: "any" | "new" | "used";
}

export const emptyFilters: Filters = {
  brand: "any", model: "any", year: "any", mileageMax: "any",
  priceMin: "", priceMax: "",
  trans: "any", fuel: "any", body: "any", condition: "any", newOrUsed: "any",
};

interface FilterPanelProps {
  f: Filters;
  setF: React.Dispatch<React.SetStateAction<Filters>>;
  reset: () => void;
  modelOptions: string[];
  inSheet?: boolean;
}

// IMPORTANT: FilterPanel is defined OUTSIDE Catalog() to prevent remount on every state update.
// Defining it inside Catalog() caused React to recreate the component on every setF() call,
// causing inputs to lose focus after the first keystroke.
function FilterPanel({ f, setF, reset, modelOptions, inSheet = false }: FilterPanelProps) {
  const { t } = useLocale();
  return (
    <div className={inSheet ? "p-5 space-y-4" : "space-y-4"}>
      {/* Price range */}
      <div>
        <Label className="text-xs">{t.common.price} ($)</Label>
        <div className="flex items-center gap-2 mt-1.5">
          <Input
            type="text"
            inputMode="numeric"
            placeholder={t.common.from}
            value={f.priceMin}
            onChange={e => setF(s => ({ ...s, priceMin: e.target.value }))}
          />
          <span className="text-muted-foreground shrink-0 text-sm font-medium">–</span>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="max"
            value={f.priceMax}
            onChange={e => setF(s => ({ ...s, priceMax: e.target.value }))}
          />
        </div>
      </div>

      {/* Grid of select filters */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">{t.common.brand}</Label>
          <Select value={f.brand} onValueChange={v => setF(s => ({ ...s, brand: v, model: "any" }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.catalog.anyBrand}</SelectItem>
              {brandList.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.model}</Label>
          <Select value={f.model} onValueChange={v => setF(s => ({ ...s, model: v }))} disabled={f.brand === "any"}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.catalog.anyModel}</SelectItem>
              {modelOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.year}</Label>
          <Select value={f.year} onValueChange={v => setF(s => ({ ...s, year: v }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">—</SelectItem>
              {[2023, 2022, 2021, 2020].map(y => <SelectItem key={y} value={String(y)}>{y}+</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.mileage} ({t.common.km})</Label>
          <Select value={f.mileageMax} onValueChange={v => setF(s => ({ ...s, mileageMax: v }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">—</SelectItem>
              <SelectItem value="20000">≤ 20 000</SelectItem>
              <SelectItem value="40000">≤ 40 000</SelectItem>
              <SelectItem value="60000">≤ 60 000</SelectItem>
              <SelectItem value="100000">≤ 100 000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.transmission}</Label>
          <Select value={f.trans} onValueChange={v => setF(s => ({ ...s, trans: v as Transmission | "any" }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.catalog.anyTransmission}</SelectItem>
              <SelectItem value="automatic">{t.transmission.automatic}</SelectItem>
              <SelectItem value="manual">{t.transmission.manual}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.fuel}</Label>
          <Select value={f.fuel} onValueChange={v => setF(s => ({ ...s, fuel: v as Fuel | "any" }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.catalog.anyFuel}</SelectItem>
              {(["petrol", "diesel", "hybrid", "electric"] as Fuel[]).map(x => <SelectItem key={x} value={x}>{t.fuel[x]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.bodyType}</Label>
          <Select value={f.body} onValueChange={v => setF(s => ({ ...s, body: v as Body | "any" }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.catalog.anyBody}</SelectItem>
              {(["sedan", "suv", "hatchback", "wagon", "van"] as Body[]).map(x => <SelectItem key={x} value={x}>{t.body[x]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.condition}</Label>
          <Select value={f.condition} onValueChange={v => setF(s => ({ ...s, condition: v as Condition | "any" }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.catalog.anyCondition}</SelectItem>
              {(["new", "used", "certified", "recent"] as Condition[]).map(x => <SelectItem key={x} value={x}>{t.condition[x]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">{t.common.newOrUsed}</Label>
          <Select value={f.newOrUsed} onValueChange={v => setF(s => ({ ...s, newOrUsed: v as "any" | "new" | "used" }))}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">—</SelectItem>
              <SelectItem value="new">{t.condition.new}</SelectItem>
              <SelectItem value="used">{t.condition.used}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={reset} className="w-full"><X className="h-4 w-4" />{t.common.reset}</Button>
    </div>
  );
}

export default function Catalog() {
  const { t, locale } = useLocale();
  const { open } = useChat();
  const [searchParams] = useSearchParams();
  const [f, setF] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const next = { ...emptyFilters };
    const cond = searchParams.get("condition");
    const body = searchParams.get("body");
    const fuel = searchParams.get("fuel");
    const budget = searchParams.get("budget");
    const use = searchParams.get("use");
    if (cond === "new") next.newOrUsed = "new";
    if (cond === "used") next.newOrUsed = "used";
    if (body) next.body = body as Body;
    if (fuel) next.fuel = fuel as Fuel;
    if (budget) {
      const [a, b] = budget.split("-");
      next.priceMin = a ?? ""; next.priceMax = b ?? "";
    }
    // use-case from Quick Car Finder
    if (use === "city") { next.body = next.body !== "any" ? next.body : "hatchback"; }
    if (use === "family") { next.body = next.body !== "any" ? next.body : "suv"; }
    if (use === "trips") { next.body = next.body !== "any" ? next.body : "suv"; }
    if (use === "economy") { next.fuel = next.fuel !== "any" ? next.fuel : "hybrid"; }
    setF(next);
  }, [searchParams]);

  const modelOptions = useMemo(() => {
    if (f.brand === "any") return [];
    return Array.from(new Set(vehicles.filter(v => v.brand === f.brand).map(v => v.model))).sort();
  }, [f.brand]);

  const filtered = useMemo(() => {
    let list = vehicles.filter(v => {
      if (f.brand !== "any" && v.brand !== f.brand) return false;
      if (f.model !== "any" && v.model !== f.model) return false;
      if (f.year !== "any" && v.year < Number(f.year)) return false;
      if (f.mileageMax !== "any" && v.mileageKm > Number(f.mileageMax)) return false;
      if (f.priceMin && v.price < Number(f.priceMin)) return false;
      if (f.priceMax && v.price > Number(f.priceMax)) return false;
      if (f.trans !== "any" && v.transmission !== f.trans) return false;
      if (f.fuel !== "any" && v.fuel !== f.fuel) return false;
      if (f.body !== "any" && v.body !== f.body) return false;
      if (f.condition !== "any" && v.condition !== f.condition) return false;
      if (f.newOrUsed === "new" && !v.isNew) return false;
      if (f.newOrUsed === "used" && v.isNew) return false;
      return true;
    });
    switch (sort) {
      case "price_asc": list.sort((a, b) => a.price - b.price); break;
      case "price_desc": list.sort((a, b) => b.price - a.price); break;
      case "mileage_asc": list.sort((a, b) => a.mileageKm - b.mileageKm); break;
      default: list.sort((a, b) => b.year - a.year);
    }
    return list;
  }, [f, sort]);

  const reset = () => setF(emptyFilters);

  return (
    <>
      <SEO title={`${t.catalog.title} | General cars`} description={t.catalog.sub} />
      <section className="bg-primary text-white">
        <div className="container-px mx-auto max-w-7xl py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold">{t.catalog.title}</h1>
          <p className="mt-3 text-white/70 max-w-2xl">{t.catalog.sub}</p>
        </div>
      </section>

      <div className="container-px mx-auto max-w-7xl py-8 grid lg:grid-cols-[300px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="bg-card rounded-xl border border-border p-5 shadow-card sticky top-20">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" />{t.common.filters}</h2>
            <FilterPanel f={f} setF={setF} reset={reset} modelOptions={modelOptions} />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <p className="text-sm text-muted-foreground">{filtered.length} {t.common.results}</p>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden"><SlidersHorizontal className="h-4 w-4" />{t.common.filters}</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] overflow-y-auto p-0">
                  <SheetHeader className="p-5 border-b border-border"><SheetTitle>{t.common.filters}</SheetTitle></SheetHeader>
                  <FilterPanel f={f} setF={setF} reset={reset} modelOptions={modelOptions} inSheet />
                </SheetContent>
              </Sheet>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px] h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t.common.sortNewest}</SelectItem>
                  <SelectItem value="price_asc">{t.common.sortPriceAsc}</SelectItem>
                  <SelectItem value="price_desc">{t.common.sortPriceDesc}</SelectItem>
                  <SelectItem value="mileage_asc">{t.common.sortMileageAsc}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-10 text-center shadow-card">
              <h3 className="font-semibold text-lg">{t.catalog.emptyTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{t.catalog.emptyDesc}</p>
              <div className="mt-6 flex justify-center gap-2 flex-wrap">
                <Button variant="cta" onClick={open}>{t.catalog.emptyCta}</Button>
                <Button variant="outline" onClick={reset}>{t.common.reset}</Button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(v => <VehicleCard key={v.slug} v={v} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
