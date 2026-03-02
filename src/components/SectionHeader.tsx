import FadeIn from './FadeIn';

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, headline, subheadline, align = 'center' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-3xl mb-14 ${alignClass}`}>
      {eyebrow && (
        <FadeIn>
          <span className="text-accent-600 text-xs font-semibold uppercase tracking-[0.2em]">{eyebrow}</span>
        </FadeIn>
      )}
      <FadeIn delay={0.05}>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-900 mt-3 mb-4">{headline}</h2>
      </FadeIn>
      {subheadline && (
        <FadeIn delay={0.1}>
          <p className="text-brand-500 text-lg leading-relaxed">{subheadline}</p>
        </FadeIn>
      )}
    </div>
  );
}
