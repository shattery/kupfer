import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Info, Scale, SlidersHorizontal } from 'lucide-react';
import { cables, formatEuro, formatPrice, type CableCategoryId } from '../../data/cables';
import { loadPriceOverrides } from '../../lib/storage';

export default function PriceCalculator() {
  const [cableId, setCableId] = useState<CableCategoryId>('nym-j');
  const [weight, setWeight] = useState(25);
  const [overrides, setOverrides] = useState<Record<string, number | null>>({});

  useEffect(() => {
    setOverrides(loadPriceOverrides());
  }, []);

  const selected = useMemo(
    () => cables.find((cable) => cable.id === cableId) ?? cables[0],
    [cableId],
  );

  const unitPrice = useMemo(() => {
    const override = overrides[selected.id];
    if (override === undefined) return selected.pricePerKg;
    return override;
  }, [overrides, selected]);

  const estimate = unitPrice === null ? null : unitPrice * weight;

  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-950 px-6 py-5 text-white sm:px-8">
        <p className="kicker text-copper-300">Preisrechner</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Was sind Ihre Kabel wert?
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          Unverbindliche Schätzung auf Basis der hinterlegten Richtwerte. Der Ankauf erfolgt ausschließlich vor Ort.
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <SlidersHorizontal className="h-4 w-4 text-copper-500" />
              Kabelart
            </span>
            <select
              value={cableId}
              onChange={(event) => setCableId(event.target.value as CableCategoryId)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-copper-400 transition focus:border-copper-400 focus:ring-2"
            >
              {cables.map((cable) => (
                <option key={cable.id} value={cable.id}>
                  {cable.name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Scale className="h-4 w-4 text-copper-500" />
                Gewicht in kg
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {weight} kg
              </span>
            </div>
            <input
              type="number"
              min={0.1}
              max={5000}
              step={0.1}
              value={weight}
              onChange={(event) => setWeight(Math.max(0, Number(event.target.value)))}
              className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-copper-400 transition focus:border-copper-400 focus:ring-2"
            />
            <input
              type="range"
              min={1}
              max={500}
              step={1}
              value={Math.min(weight, 500)}
              onChange={(event) => setWeight(Number(event.target.value))}
              className="w-full accent-copper-500"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>1 kg</span>
              <span>500 kg</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-slate-50 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Richtwert</p>
            <p className="mt-1 text-sm text-slate-600">{formatPrice(unitPrice)}</p>
            <p className="mt-6 text-sm text-slate-500">Geschätzter Wert</p>
            <p className="font-display text-4xl font-semibold tracking-tight text-slate-950">
              {formatEuro(estimate)}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs leading-relaxed text-amber-950">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <span>
                Unverbindliche Schätzung. Der endgültige Ankaufspreis wird nach Prüfung und Verwiegung vor Ort festgelegt.
              </span>
            </div>
            <a href="/vor-ort-verkaufen" className="btn-copper w-full">
              JETZT VOR ORT VERKAUFEN
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
