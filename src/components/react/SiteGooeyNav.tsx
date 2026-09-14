import GooeyNav from '../reactbits/GooeyNav/GooeyNav';
import { navItems } from '../../data/site';

interface Props {
  currentPath: string;
}

export default function SiteGooeyNav({ currentPath }: Props) {
  const items = navItems.map((item) => ({ label: item.label, href: item.href }));
  const matched = items.findIndex((item) => item.href === currentPath);
  const initialActiveIndex = matched >= 0 ? matched : 0;

  return (
    <div className="hidden min-w-0 flex-1 justify-center lg:flex">
      <GooeyNav
        items={items}
        initialActiveIndex={initialActiveIndex}
        animationTime={1000}
        particleCount={10}
        particleDistances={[48, 10]}
        timeVariance={160}
      />
    </div>
  );
}
