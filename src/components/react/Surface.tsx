import type { ReactNode } from 'react';
import FadeContent from '../reactbits/FadeContent/FadeContent';

interface SurfaceProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
}

export default function Surface({ children, className = '', delay = 0 }: SurfaceProps) {
  return (
    <FadeContent className={`h-full overflow-hidden ${className}`} delay={delay} duration={420}>
      {children}
    </FadeContent>
  );
}
