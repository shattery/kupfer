import { cables } from '../../data/cables';
import ScrollVelocity from '../reactbits/ScrollVelocity/ScrollVelocity';

const cableLine = `${cables.map((cable) => cable.shortName).join('   ·   ')}   ·   `;
const promiseLine = 'Prüfung   ·   Verwiegung   ·   Angebot   ·   Sofort-Auszahlung   ·   Nur vor Ort   ·   ';

const textClass = 'font-display text-sm font-semibold uppercase tracking-[0.28em] text-copper-800/70 sm:text-base';

export default function CableMarquee() {
  return (
    <section className="relative bg-white" aria-hidden="true">
      <div className="border-y border-copper-100 bg-gradient-to-r from-white via-copper-50 to-white py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ScrollVelocity
          texts={[cableLine, promiseLine]}
          velocity={32}
          numCopies={4}
          className={textClass}
          parallaxClassName="py-1"
        />
      </div>
    </section>
  );
}
