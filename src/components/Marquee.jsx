import { Sparkles } from 'lucide-react';
import { TECH_MARQUEE } from '../data';

export default function Marquee() {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE]; // duplicated for a seamless loop

  return (
    <div className="relative border-y border-white/5 bg-white/[0.02] py-5">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-white"
            >
              {item}
              <Sparkles size={14} className="text-neon-pink/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
