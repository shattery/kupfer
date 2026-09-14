import { useEffect, useState } from 'react';
import Counter from '../reactbits/Counter/Counter';

const stats = [
  { value: 15, label: 'Jahre Erfahrung', places: [10, 1] as number[] },
  { value: 8, label: 'Kabelarten', places: [1] as number[] },
  { value: 100, label: '% vor Ort', places: [100, 10, 1] as number[] },
] as const;

export default function HeroCounters() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 180);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
      {stats.map((stat) => (
        <div key={stat.label}>
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
