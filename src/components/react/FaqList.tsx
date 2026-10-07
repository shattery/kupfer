import { faqs } from '../../data/faq';
import Surface from './Surface';

export default function FaqList() {
  return (
    <div className="space-y-3">
      {faqs.map((item, index) => (
        <Surface key={item.id} className="surface-card" delay={index * 40}>
          <details className="group">
            <summary className="cursor-pointer list-none px-6 py-5 font-medium text-slate-950 marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-copper-500 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </details>
        </Surface>
      ))}
    </div>
  );
}
