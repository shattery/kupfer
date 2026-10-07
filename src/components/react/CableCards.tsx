import { cables, formatPrice } from '../../data/cables';
import Surface from './Surface';

export default function CableCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cables.map((cable, index) => (
        <Surface key={cable.id} className="surface-card" delay={index * 70}>
          <article className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-950">{cable.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wide text-copper-600">{cable.standards}</p>
              </div>
              <span className="rounded-full bg-copper-50 px-3 py-1 text-xs font-semibold text-copper-800">
                {formatPrice(cable.pricePerKg)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{cable.description}</p>
            <p className="mt-3 text-sm text-slate-500">Einsatz: {cable.typicalUse}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
              {cable.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        </Surface>
      ))}
    </div>
  );
}
