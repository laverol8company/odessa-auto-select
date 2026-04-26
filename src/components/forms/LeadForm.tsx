import { useState, FormEvent, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "@/context/LocaleContext";
import { CheckCircle2 } from "lucide-react";

export interface LeadField {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea" | "number" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: string;
  full?: boolean;
}

interface Props {
  fields: LeadField[];
  submitLabel?: string;
  leadType: string;
  selectedCar?: string;
  intro?: ReactNode;
  hideMicrocopy?: boolean;
  compact?: boolean;
}

export function LeadForm({ fields, submitLabel, leadType, selectedCar, intro, hideMicrocopy, compact }: Props) {
  const { t, locale } = useLocale();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = {};
    form.forEach((v, k) => { data[k] = v; });

    // Basic validation
    const phoneField = fields.find(f => f.type === "tel");
    if (phoneField && !String(data[phoneField.name] ?? "").trim()) {
      setSubmitting(false);
      setError(t.form.requiredPhone);
      return;
    }
    const nameField = fields.find(f => f.name === "name");
    if (nameField && nameField.required && !String(data["name"] ?? "").trim()) {
      setSubmitting(false);
      setError(t.form.requiredName);
      return;
    }

    try {
      const lead = {
        leadType,
        selectedCar: selectedCar ?? null,
        locale,
        submittedAt: new Date().toISOString(),
        data,
      };
      const all = JSON.parse(localStorage.getItem("leads") ?? "[]");
      all.push(lead);
      localStorage.setItem("leads", JSON.stringify(all));
      setTimeout(() => {
        setSubmitting(false);
        setSuccess(true);
        (e.target as HTMLFormElement).reset?.();
      }, 600);
    } catch {
      setSubmitting(false);
      setError(t.form.sendError);
    }
  };

  if (success) {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 mx-auto text-success" />
        <h3 className="mt-3 font-semibold text-lg">{t.form.successTitle}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{t.form.successDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"} noValidate>
      {intro}
      {!hideMicrocopy && <p className="text-xs text-muted-foreground">{t.form.microcopy}</p>}
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map((f) => (
          <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
            <Label htmlFor={f.name} className="text-xs font-medium">{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
            {f.type === "textarea" ? (
              <Textarea id={f.name} name={f.name} rows={3} placeholder={f.placeholder} defaultValue={f.defaultValue} className="mt-1.5" />
            ) : f.type === "select" && f.options ? (
              <Select name={f.name} defaultValue={f.defaultValue}>
                <SelectTrigger id={f.name} className="mt-1.5"><SelectValue placeholder={f.placeholder ?? "—"} /></SelectTrigger>
                <SelectContent>
                  {f.options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <Input id={f.name} name={f.name} type={f.type ?? "text"} placeholder={f.placeholder} defaultValue={f.defaultValue} className="mt-1.5" />
            )}
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={submitting}>
        {submitting ? t.form.submitting : (submitLabel ?? t.form.submit)}
      </Button>
    </form>
  );
}
