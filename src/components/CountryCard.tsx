import { MapPin, Anchor } from 'lucide-react';

interface CountryCardProps {
  name: string;
  flag: string;
  score: number;
  maxScore: number;
  competition: string;
  population: string;
  port: string;
  topProducts: string;
}

export default function CountryCard({ name, flag, score, maxScore, competition, population, port, topProducts }: CountryCardProps) {
  const competitionColor =
    competition === 'LOW' ? 'text-accent-700 bg-accent-50 border-accent-200' :
    competition === 'MODERATE' ? 'text-amber-700 bg-amber-50 border-amber-200' :
    'text-rose-700 bg-rose-50 border-rose-200';

  return (
    <div className="bg-white rounded-2xl border border-brand-100 overflow-hidden card-hover p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-4xl">{flag}</span>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-brand-900">{name}</h3>
          {/* Score dots */}
          <div className="flex items-center gap-1 mt-1.5">
            {Array.from({ length: maxScore }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i < score ? 'bg-accent-500' : 'bg-brand-100'}`}
              />
            ))}
            <span className="text-xs text-brand-400 ml-1.5 font-medium">{score}/{maxScore}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${competitionColor}`}>
          {competition}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <div className="text-[10px] text-brand-400 uppercase tracking-wide">Population</div>
            <div className="font-semibold text-brand-800">{population}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Anchor className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <div className="text-[10px] text-brand-400 uppercase tracking-wide">Port</div>
            <div className="font-semibold text-brand-800">{port}</div>
          </div>
        </div>
        <div className="pt-3 border-t border-brand-100">
          <div className="text-[10px] text-brand-400 uppercase tracking-wide mb-1">Top Products</div>
          <p className="font-medium text-brand-700">{topProducts}</p>
        </div>
      </div>
    </div>
  );
}
