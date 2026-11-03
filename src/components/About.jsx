import { motion } from 'framer-motion';
import {
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  Server,
  ShieldCheck,
  Smartphone,
  Wrench,
  Zap,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { SKILLS } from '../data';
import { slideLeft, slideRight, zoomBlur } from '../animations';

const SKILL_ICONS = { code: Code2, server: Server, database: Database, wrench: Wrench };

const VALUES = [
  { icon: Zap, title: 'Performance-minded', text: 'Fast, lightweight builds with Vite.' },
  { icon: Smartphone, title: 'Responsive by default', text: 'Looks great from phone to desktop.' },
  { icon: ShieldCheck, title: 'Secure by design', text: 'JWT auth and validated APIs.' },
];

const TIMELINE = [
  {
    icon: Briefcase,
    tag: 'Experience',
    title: 'Full-Stack Intern',
    place: 'Corvit Networks, Lahore',
    meta: '6 months',
    text: 'Worked on real-world MERN projects, collaborated with a team and sharpened React, Node.js, Express and MongoDB skills.',
  },
  {
    icon: GraduationCap,
    tag: 'Education',
    title: 'BS Computer Science',
    place: 'Lahore College for Women University (LCWU)',
    meta: 'Bachelor’s Degree',
    text: 'Built a strong foundation in algorithms, databases and software engineering.',
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Crafting products that look as good as they work"
        subtitle="A MERN Stack developer from Lahore who cares about clean code, performance and design details."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Summary */}
        <motion.div
          {...slideLeft()}
        >
          <h3 className="font-display text-xl font-bold text-white">Professional Summary</h3>
          <p className="mt-4 leading-relaxed text-slate-400">
            I&apos;m a MERN Stack developer passionate about building complete web applications, from
            intuitive, animated interfaces to secure, well-structured backends. During my six-month
            internship at Corvit Networks I worked on real projects and grew my skills across the
            entire stack.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            My recent work spans e-commerce, travel, bakery ordering, event management and an
            AI-powered legal assistant built with the Gemini API.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass rounded-xl p-4">
                <Icon size={20} className="text-neon-pink" />
                <p className="mt-3 text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-neon-pink via-neon-purple to-transparent"
          />
          <div className="space-y-8">
            {TIMELINE.map(({ icon: Icon, tag, title, place, meta, text }, i) => (
              <motion.div
                key={title}
                {...slideRight(i)}
                className="relative"
              >
                <span className="absolute -left-8 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-neon-pink/60 bg-void">
                  <span className="h-2 w-2 rounded-full bg-neon-pink" />
                </span>
                <SpotlightCard className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-pink">
                      <Icon size={14} /> {tag}
                    </span>
                    <span className="badge">{meta}</span>
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold text-white">{title}</h4>
                  <p className="text-sm text-neon-purple">{place}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <h3 className="mb-8 mt-20 text-center font-display text-2xl font-bold text-white">
        Technical <span className="text-gradient">Skills</span>
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map(({ category, icon, items }, i) => {
          const Icon = SKILL_ICONS[icon];
          return (
            <SpotlightCard
              key={category}
              {...zoomBlur(i)}
              className="p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-pink/15 text-neon-pink">
                  <Icon size={20} />
                </span>
                <h4 className="font-display font-bold text-white">{category}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
