import { useEffect, useMemo, useState } from 'react';
import Counter from '../reactbits/Counter/Counter';
import { cables } from '../../data/cables';
import { site } from '../../data/site';

type Stat = {
  key: string;
  value: number;
  label: string;
  places: number[];
  suffix?: string;
};

function placesFor(value: number): number[] {
  if (value >= 100) return [100, 10, 1];
  if (value >= 10) return [10, 1];
  return [1];
}

export default function HeroCounters() {
  const [ready, setReady] = useState(false);

  const stats = useMemo(() => {
    const accepted = cables.filter((c) => c.accepted).length;
    const next: Stat[] = [];

    if (typeof site.yearsExperience === 'number' && site.yearsExperience > 0) {
      next.push({
        key: 'years',
        value: site.yearsExperience,
        label: 'Jahre Erfahrung',
        places: placesFor(site.yearsExperience),
      });
    }

    next.push({
      key: 'cables',
      value: accepted,
      label: 'Kabelarten',
      places: placesFor(accepted),
    });

    next.push({
      key: 'onsite',
      value: 100,
      label: '% vor Ort',
      places: [100, 10, 1],
    });

    return next;
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 220);
    return () => window.clearTimeout(id);
  }, []);

  if (stats.length === 0) return null;

  return (
    <dl className="mt-10 grid max-w-lg grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.key}>
          <dt className="text-xs text-slate-400 sm:text-sm">{stat.label}</dt>
          <dd className="mt-2 text-white">
            <Counter
              value={ready ? stat.value : 0}
              places={[...stat.places]}
              fontSize={36}
              gap={2}
              horizontalPadding={0}
              borderRadius={0}
              textColor="#ffffff"
              fontWeight={700}
              gradientFrom="#020617"
              gradientTo="transparent"
              gradientHeight={10}
              containerStyle={{ display: 'inline-flex' }}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
