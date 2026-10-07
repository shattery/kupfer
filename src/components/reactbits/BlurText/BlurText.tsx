import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

type AnimState = {
  filter?: string;
  opacity?: number;
  y?: number;
};

type TagName = 'p' | 'h1' | 'h2' | 'span';

interface BlurTextProps {
  text?: string;
  delay?: number;
  startDelay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimState;
  animationTo?: AnimState[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: TagName;
}

function buildKeyframes(from: AnimState, steps: AnimState[]) {
  const keys = new Set<keyof AnimState>([
    ...(Object.keys(from) as (keyof AnimState)[]),
    ...steps.flatMap((step) => Object.keys(step) as (keyof AnimState)[]),
  ]);

  const keyframes: Record<string, Array<string | number | undefined>> = {};
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])];
  });
  return keyframes;
}

export default function BlurText({
  text = '',
  delay = 70,
  startDelay = 0,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.4,
  as = 'p',
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(8px)', opacity: 0, y: -14 }
        : { filter: 'blur(8px)', opacity: 0, y: 14 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(4px)',
        opacity: 0.55,
        y: direction === 'top' ? 3 : -3,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const visible = { filter: 'blur(0px)', opacity: 1, y: 0 };
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));
  const style: CSSProperties = { display: 'flex', flexWrap: 'wrap' };
  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={style}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        return (
          <motion.span
            className="blur-text-word inline-block will-change-[transform,filter,opacity]"
            key={`${segment}-${index}`}
            initial={visible}
            animate={inView ? animateKeyframes : visible}
            transition={{
              duration: totalDuration,
              times,
              delay: (startDelay + index * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Tag>
  );
}
