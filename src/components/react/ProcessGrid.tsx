import { processSteps } from '../../data/site';
import Surface from './Surface';

export default function ProcessGrid() {
  return (
    <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {processSteps.map((step, index) => (
        <li key={step.number} className="h-full">
          <Surface className="surface-card" delay={index * 90}>
            <div className="p-5">
              <span className="font-display text-3xl font-semibold text-copper-500">{step.number}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </div>
          </Surface>
        </li>
      ))}
    </ol>
  );
}
