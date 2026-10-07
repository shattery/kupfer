import { Banknote, MapPin, ShieldCheck, type LucideIcon } from 'lucide-react';
import Surface from './Surface';

const items: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: MapPin,
    title: 'Nur persönlich vor Ort',
    text: 'Alle Transaktionen finden am Firmenstandort statt. Keine Annahme von Sendungen.',
  },
  {
    icon: ShieldCheck,
    title: 'Prüfung vor dem Preis',
    text: 'Kabelart, Reinheit und Gewicht bestimmen das Angebot – nachvollziehbar und nach Verwiegung.',
  },
  {
    icon: Banknote,
    title: 'Sofort-Auszahlung',
    text: 'Nach Annahme der Ware erfolgt die Auszahlung direkt vor Ort.',
  },
];

export default function AdvantageCards() {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Surface key={item.title} className="surface-card" delay={index * 110}>
            <div className="p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-copper-50 text-copper-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          </Surface>
        );
      })}
    </div>
  );
}
