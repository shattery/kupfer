import { useRef, type ReactNode } from 'react';

import './SpotlightCard.css';

interface SpotlightCardProps {
  children?: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(184, 115, 51, 0.22)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = divRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    node.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
}
