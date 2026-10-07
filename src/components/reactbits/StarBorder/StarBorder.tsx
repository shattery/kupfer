import type { CSSProperties, ElementType, ReactNode } from 'react';

type StarBorderProps<T extends ElementType> = {
  as?: T;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
  color?: string;
  speed?: CSSProperties['animationDuration'];
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'color'>;

export default function StarBorder<T extends ElementType = 'button'>({
  as,
  className = '',
  innerClassName = 'px-6 py-3 text-sm font-semibold tracking-wide',
  color = 'white',
  speed = '6s',
  thickness = 1,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  borderColor = '#222222',
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      {...rest}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as { style?: CSSProperties }).style,
      }}
    >
      <span
        className="animate-star-movement-bottom pointer-events-none absolute -bottom-[11px] -right-[250%] z-0 h-[50%] w-[300%] rounded-full opacity-80"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="animate-star-movement-top pointer-events-none absolute -left-[250%] -top-[10px] z-0 h-[50%] w-[300%] rounded-full opacity-80"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed,
        }}
      />
      <span
        className={`relative z-[1] block rounded-full border text-center ${innerClassName}`}
        style={{ background: backgroundColor, color: textColor, borderColor }}
      >
        {children}
      </span>
    </Component>
  );
}
