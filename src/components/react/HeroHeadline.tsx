import BlurText from '../reactbits/BlurText/BlurText';
import GradientText from '../reactbits/GradientText/GradientText';

const lineClass = 'w-full font-display text-4xl font-semibold tracking-tight sm:text-6xl';

export default function HeroHeadline() {
  return (
    <h1 className="mt-4 text-white leading-[1.08]">
      <BlurText as="span" text="Kupferkabel ankaufen." delay={55} className={lineClass} />
      <GradientText
        as="span"
        colors={['#fff7ee', '#f4e6d4', '#ffffff', '#e8b07a', '#d97736']}
        animationSpeed={5}
        className="mt-1 font-display text-4xl font-semibold tracking-tight sm:text-6xl"
      >
        Transparent. Vor Ort.
      </GradientText>
    </h1>
  );
}
