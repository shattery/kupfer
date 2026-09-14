import { useEffect, useMemo, useState } from 'react';
import { cables, formatPrice, PRICE_UPDATED_AT } from '../../data/cables';
import { loadPriceOverrides } from '../../lib/storage';

export default function PriceTable() {
  const [overrides, setOverrides] = useState<Record<string, number | null>>({});

  useEffect(() => {
    setOverrides(loadPriceOverrides());
  }, []);

  const rows = useMemo(
    () =>
      cables.map((cable) => ({
        ...cable,
        displayPrice: overrides[cable.id] === undefined ? cable.pricePerKg : overrides[cable.id],
      })),
    [overrides],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-slate-500">Stand: {PRICE_UPDATED_AT}</p>
        <p className="text-sm text-slate-500">Unverbindliche Richtwerte in €/kg</p>
      </div>
      <div className="surface-card overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-6 py-4 font-medium">Kabelart</th>
              <th className="px-6 py-4 font-medium">Norm / Typ</th>
              <th className="px-6 py-4 font-medium">Richtwert</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((cable) => (
              <tr key={cable.id} className="border-t border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-950">{cable.name}</td>
                <td className="px-6 py-4 text-slate-600">{cable.standards}</td>
                <td className="px-6 py-4 font-semibold text-copper-700">{formatPrice(cable.displayPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
