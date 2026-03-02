interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      {/* Globe */}
      <circle cx="22" cy="22" r="11" strokeWidth="1.6" />
      <ellipse cx="22" cy="22" rx="5" ry="11" strokeWidth="1.1" />
      <line x1="11" y1="22" x2="33" y2="22" strokeWidth="1.1" />
      <path d="M 13 16 Q 22 13.5 31 16" strokeWidth="0.9" />
      <path d="M 13 28 Q 22 30.5 31 28" strokeWidth="0.9" />
      {/* Orbit arrow 1: over the top (8 o'clock → 2 o'clock) */}
      <path d="M 7 31 A 17 17 0 0 0 37 13" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 34 8.5 L 37.5 13.5 L 32 16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Orbit arrow 2: under the bottom (2 o'clock → 8 o'clock) */}
      <path d="M 37 31 A 17 17 0 0 1 7 13" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 10 8.5 L 6.5 13.5 L 12 16" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ className = '', iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <GlobeIcon className="w-8 h-8 flex-shrink-0" />
      {!iconOnly && (
        <span className="font-bold text-[17px] tracking-tight leading-tight">
          Fast Scaling<br className="sm:hidden" />{' '}Trade
        </span>
      )}
    </div>
  );
}

export { GlobeIcon };
