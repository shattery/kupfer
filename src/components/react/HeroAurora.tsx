import Aurora from '../reactbits/Aurora/Aurora';

export default function HeroAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <Aurora
        colorStops={['#e8a56a', '#fff4e4', '#c86a32']}
        amplitude={1.15}
        blend={0.55}
        speed={0.42}
      />
    </div>
  );
}
