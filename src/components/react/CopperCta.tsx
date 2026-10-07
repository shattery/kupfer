import StarBorder from '../reactbits/StarBorder/StarBorder';

interface CopperCtaProps {
  href: string;
  label: string;
  compact?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

const copperFill = 'linear-gradient(135deg, #e8b07a 0%, #d97736 38%, #c86a32 62%, #9a5a28 100%)';

export default function CopperCta({ href, label, compact = false, className = '', target, rel }: CopperCtaProps) {
  return (
    <StarBorder
      as="a"
      href={href}
      target={target}
      rel={rel}
      color="#fff8ef"
      speed="4.8s"
      thickness={2}
      backgroundColor={copperFill}
      textColor="#fffaf5"
      borderColor="rgba(255,255,255,0.28)"
      className={`group shadow-copper outline-none focus-visible:ring-2 focus-visible:ring-copper-200 ${className}`.trim()}
      innerClassName={`${
        compact ? 'px-5 py-2.5' : 'px-6 py-3'
      } text-sm font-semibold tracking-wide transition-[filter] duration-200 group-hover:brightness-[1.06]`}
    >
      {label}
    </StarBorder>
  );
}
