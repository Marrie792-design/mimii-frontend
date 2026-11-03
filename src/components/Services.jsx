import { ArrowUpRight, Check, Code2, Layers, Palette, Server } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { SERVICES } from '../data';
import { flipIn } from '../animations';

const ICONS = { layers: Layers, code: Code2, server: Server, palette: Palette };

export default function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading
        index="02"
        eyebrow="Services"
        title="What I can build for you"
        subtitle="Everything you need to take a product from idea to a polished, live application."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon, title, text, points }, i) => {
          const Icon = ICONS[icon];
          return (
            <SpotlightCard
              key={title}
              {...flipIn(i)}
              className="group flex flex-col p-7"
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/25 to-neon-violet/25 text-neon-pink">
                  <Icon size={26} />
                </span>
                <span className="font-mono text-sm text-slate-600">0{i + 1}</span>
              </div>

              <h3 className="font-display text-base font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>

              <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check size={14} className="text-neon-pink" /> {p}
                  </li>
                ))}
              </ul>

              <ArrowUpRight
                size={20}
                className="mt-6 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-neon-pink"
              />
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
