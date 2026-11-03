import { useState } from 'react';
import { Cake, ExternalLink, Github, Plane, Scale, ShoppingBag, Ticket } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { PROJECTS } from '../data';
import { fadeUp, slideLeft, slideRight } from '../animations';

// Cards enter from alternating sides so the grid feels like it "closes in"
const REVEALS = [slideLeft, slideRight, slideLeft, fadeUp, slideRight];

const ICONS = { bag: ShoppingBag, cake: Cake, plane: Plane, scale: Scale, ticket: Ticket };

// Covers use the active theme colors, so they follow the theme switcher
const COVERS = [
  'from-neon-pink/70 to-neon-violet/40',
  'from-neon-purple/70 to-void',
  'from-neon-violet/70 to-neon-pink/30',
  'from-neon-pink/60 to-void',
  'from-neon-purple/60 to-neon-violet/40',
];

const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'webp'];

// Shows the project screenshot (project.image in data.js).
// If there is no image, or the file is missing, it falls back to the themed gradient cover.
function ProjectCover({ project, Icon, gradient }) {
  // Tries the file with .png, .jpg, .jpeg, .webp in turn, so the extension never matters
  const [extIndex, setExtIndex] = useState(0);
  const base = project.image ? project.image.replace(/\.[^/.]+$/, '') : null;
  const hasImage = Boolean(base) && extIndex < IMAGE_EXTS.length;

  return (
    <div
      className={`relative h-44 overflow-hidden rounded-xl ${
        hasImage ? 'bg-void' : `bg-gradient-to-br ${gradient}`
      } ${project.featured ? 'sm:h-56' : ''}`}
    >
      {hasImage ? (
        <>
          <img
            src={`${base}.${IMAGE_EXTS[extIndex]}`}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={() => setExtIndex((i) => i + 1)}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />
        </>
      ) : (
        <>
          <div className="bg-grid-sm absolute inset-0 opacity-30" />
          <Icon
            size={project.featured ? 96 : 72}
            strokeWidth={1.2}
            className="absolute -bottom-3 -right-3 rotate-[-12deg] text-white/25 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0"
          />
          <Icon size={30} className="absolute bottom-4 left-4 text-white" />
        </>
      )}

      <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
        {project.category}
      </span>
      {project.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-black">
          FEATURED
        </span>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="section">
      <SectionHeading
        index="03"
        eyebrow="Work"
        title="Featured projects"
        subtitle="A selection of full-stack projects I've designed and built end to end."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => {
          const Icon = ICONS[project.icon];
          return (
            <SpotlightCard
              key={project.title}
              {...REVEALS[i % REVEALS.length]((i % 3) * 0.5)}
              className={`group flex flex-col p-4 ${project.featured ? 'lg:col-span-2' : ''}`}
            >
              {/* Cover */}
              <ProjectCover project={project} Icon={Icon} gradient={COVERS[i % COVERS.length]} />

              {/* Body */}
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary !px-4 !py-2 text-xs"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-500">
                      Demo soon
                    </span>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost !px-4 !py-2 text-xs"
                  >
                    <Github size={14} /> Code
                  </a>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
