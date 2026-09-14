import { useEffect, useMemo, useState } from 'react';
import { Cable, ClipboardList, Save } from 'lucide-react';
import { cables, formatPrice } from '../../data/cables';
import {
  INQUIRY_STATUSES,
  loadInquiries,
  loadPriceOverrides,
  saveInquiries,
  savePriceOverrides,
  type Inquiry,
  type InquiryStatus,
} from '../../lib/storage';

const statusStyles: Record<InquiryStatus, string> = {
  Neu: 'bg-sky-100 text-sky-800',
  'Wird geprüft': 'bg-indigo-100 text-indigo-800',
  'Rückfrage erforderlich': 'bg-amber-100 text-amber-900',
  'Termin vereinbart': 'bg-violet-100 text-violet-800',
  'Vor Ort eingetroffen': 'bg-cyan-100 text-cyan-800',
  'Ware wird geprüft': 'bg-orange-100 text-orange-800',
  'Ankauf abgeschlossen': 'bg-emerald-100 text-emerald-800',
  'Auszahlung erfolgt': 'bg-green-100 text-green-800',
  Abgelehnt: 'bg-rose-100 text-rose-800',
};

export default function AdminDashboard() {
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const overrides = loadPriceOverrides();
    const initial: Record<string, string> = {};
    for (const cable of cables) {
      const value = overrides[cable.id] ?? cable.pricePerKg;
      initial[cable.id] = value === null || value === undefined ? '' : String(value);
    }
    setPrices(initial);
    setInquiries(loadInquiries());
  }, []);

  const parsedPrices = useMemo(() => {
    const next: Record<string, number | null> = {};
    for (const cable of cables) {
      const raw = prices[cable.id];
      if (!raw || raw.trim() === '') {
        next[cable.id] = null;
      } else {
        const num = Number(raw.replace(',', '.'));
        next[cable.id] = Number.isNaN(num) ? null : num;
      }
    }
    return next;
  }, [prices]);

  const persistPrices = () => {
    savePriceOverrides(parsedPrices);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const updateStatus = (id: string, status: InquiryStatus) => {
    const next = inquiries.map((item) => (item.id === id ? { ...item, status } : item));
    setInquiries(next);
    saveInquiries(next);
  };

  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <p className="kicker">Preise</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-slate-950">Richtwerte live anpassen</h2>
          </div>
          <button type="button" onClick={persistPrices} className="btn-copper">
            <Save className="h-4 w-4" />
            Speichern
          </button>
        </div>
        {saved && (
          <p className="bg-emerald-50 px-6 py-2 text-sm text-emerald-800">Richtwerte gespeichert. Der Rechner nutzt die neuen Werte.</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium">Kabelart</th>
                <th className="px-6 py-3 font-medium">€/kg</th>
                <th className="px-6 py-3 font-medium">Anzeige</th>
              </tr>
            </thead>
            <tbody>
              {cables.map((cable) => (
                <tr key={cable.id} className="border-t border-slate-100">
                  <td className="px-6 py-3 font-medium text-slate-900">{cable.name}</td>
                  <td className="px-6 py-3">
                    <input
                      value={prices[cable.id] ?? ''}
                      onChange={(event) =>
                        setPrices((current) => ({ ...current, [cable.id]: event.target.value }))
                      }
                      placeholder="XX,XX"
                      className="w-32 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-copper-400 focus:ring-2 focus:ring-copper-400"
                    />
                  </td>
                  <td className="px-6 py-3 text-slate-600">{formatPrice(parsedPrices[cable.id] ?? null)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-card overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-5">
          <p className="kicker">Pipeline</p>
          <h2 className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-slate-950">
            <ClipboardList className="h-6 w-6 text-copper-500" />
            Anfragen
          </h2>
        </div>
        {inquiries.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            <Cable className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            Noch keine Anfragen. Formulare auf den Seiten speichern Testdaten lokal in diesem Browser.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Eingang</th>
                  <th className="px-4 py-3 font-medium">Typ</th>
                  <th className="px-4 py-3 font-medium">Kontakt</th>
                  <th className="px-4 py-3 font-medium">Material</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-t border-slate-100 align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleString('de-DE')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium uppercase tracking-wide">
                        {inquiry.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{inquiry.name}</p>
                      {inquiry.company && <p className="text-xs text-slate-500">{inquiry.company}</p>}
                      <p className="text-xs text-slate-500">{inquiry.phone}</p>
                      <p className="text-xs text-slate-500">{inquiry.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{inquiry.cableType}</p>
                      <p className="text-xs text-slate-500">{inquiry.weight}</p>
                      <p className="text-xs text-slate-500">{inquiry.photoCount} Foto(s)</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`mb-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[inquiry.status]}`}>
                        {inquiry.status}
                      </span>
                      <select
                        value={inquiry.status}
                        onChange={(event) => updateStatus(inquiry.id, event.target.value as InquiryStatus)}
                        className="mt-2 block w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                      >
                        {INQUIRY_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
