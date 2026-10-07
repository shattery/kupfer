import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface FadeContentProps {
  children?: ReactNode;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

function getMs(value: number) {
  return value > 10 ? value : value * 1000;
}

export default function FadeContent({
  children,
  blur = false,
  duration = 420,
  delay = 0,
  threshold = 0.15,
  className = '',
  style,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.bottom > 0 && rect.top < window.innerHeight * 0.92;
    if (alreadyVisible) return;

    const ms = Math.min(getMs(duration), 450);
    const delayMs = getMs(delay);

    el.style.opacity = '0';
    if (blur) el.style.filter = 'blur(6px)';
    el.style.transition = `opacity ${ms}ms ease, filter ${ms}ms ease`;
    el.style.transitionDelay = `${delayMs}ms`;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.style.opacity = '1';
      el.style.filter = 'none';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);

    const failsafe = window.setTimeout(() => {
      reveal();
      observer.disconnect();
    }, delayMs + ms + 700);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      el.style.opacity = '1';
      el.style.filter = 'none';
    };
  }, [blur, delay, duration, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
