import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Rocket,
} from 'lucide-react';
import { PROFILE, TYPED_TITLES } from '../data';

/* ---------- helpers ---------- */

function useTypewriter(words, typingSpeed = 90, deletingSpeed = 45, pause = 1500) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 6, suffix: '+', label: 'Months Internship' },
  { to: 5, suffix: '+', label: 'Full-Stack Projects' },
  { to: 4, suffix: '', label: 'Core MERN Techs' },
];

const SOCIALS = [
  { icon: Github, href: PROFILE.github, label: 'GitHub' },
  { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
  { icon: MessageCircle, href: PROFILE.whatsappHref, label: 'WhatsApp' },
  { icon: Mail, href: PROFILE.emailHref, label: 'Email' },
];

/* ---------- hero media (photo / video) ----------
   Put ONE of these files in /public. The first one found is used:
   hero.webm, hero.mp4  -> looping video (e.g. a 3D character walking)
   hero.png, hero.webp, hero.jpg, profile.jpg, profile.png -> photo
*/
const CANDIDATES = [
  { src: '/hero.webm', kind: 'video' },
  { src: '/hero.mp4', kind: 'video' },
  { src: '/hero.png', kind: 'image' },
  { src: '/hero.enc', kind: 'image' },
  // { src: '/hero.jpg', kind: 'image' },
  { src: '/profile.jpg', kind: 'image' },
  { src: '/profile.png', kind: 'image' },
];

function useHeroMedia() {
  const [media, setMedia] = useState(undefined); // undefined = still checking, null = none found

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const c of CANDIDATES) {
        try {
          const res = await fetch(c.src, { method: 'HEAD' });
          const type = res.headers.get('content-type') || '';
          // a missing file often returns index.html (text/html) — skip those
          if (res.ok && !type.includes('text/html')) {
            if (!cancelled) setMedia(c);
            return;
          }
        } catch {
          /* try next */
        }
      }
      if (!cancelled) setMedia(null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return media;
}

/* ---------- right-side visual ---------- */

function FloatChip({ label, dot, className, delay = 0 }) {
  return (
    <motion.span
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`glass absolute z-20 flex items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </motion.span>
  );
}

function InfoCard({ icon: Icon, title, text, tone, className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`glass absolute z-20 hidden items-center gap-3 rounded-2xl bg-black/60 px-4 py-3 shadow-xl sm:flex ${className}`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs font-semibold text-white">{title}</p>
        <p className="text-[11px] text-slate-400">{text}</p>
      </div>
    </motion.div>
  );
}

function MediaCard({ media }) {
  // 3D tilt that follows the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 16 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative"
    >
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-neon-pink/30 to-neon-violet/30 blur-3xl" />

      <div className="relative rounded-[32px] bg-gradient-to-br from-neon-pink via-neon-purple to-neon-violet p-[2px] shadow-purple">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-void">
          {media?.kind === 'video' && (
            <video
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
              className="hero-media h-full w-full object-cover"
            />
          )}
          {media?.kind === 'image' && (
            <img
              src={media.src}
              alt={PROFILE.name}
              className="hero-media h-full w-full object-cover"
            />
          )}
          {media === null && (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-gradient font-display text-7xl font-black">MM</span>
            </div>
          )}
          {/* soft fade at the bottom + shine */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          {/* theme-colored light blended into the photo so it matches the active palette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neon-pink/30 via-transparent to-neon-violet/20 mix-blend-soft-light" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0" />
        </div>
      </div>
    </motion.div>
  );
}

function HeroVisual() {
  const media = useHeroMedia();

  return (
    <div className="relative mx-auto w-[270px] sm:w-[330px] lg:w-[380px]">
      {/* decorative rotating rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[135%] w-[135%] animate-[spin_70s_linear_infinite] rounded-full border border-dashed border-white/10" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[112%] w-[112%] animate-[spin_50s_linear_infinite_reverse] rounded-full border border-white/[0.07]" />
      </div>

      <MediaCard media={media} />

      {/* floating tech chips */}
      {/* side chips and cards are hidden on phones so they never cover the photo */}
      <FloatChip label="React" dot="bg-sky-400" className="hidden sm:flex -left-2 top-[26%] sm:-left-10" />
      <FloatChip label="Node.js" dot="bg-green-400" className="hidden sm:flex -right-2 top-[46%] sm:-right-10" delay={0.6} />
      <FloatChip label="MongoDB" dot="bg-emerald-400" className="hidden sm:flex -right-2 bottom-[15%] sm:-right-8" delay={1.2} />
      <FloatChip label="Express" dot="bg-slate-300" className="left-[10%] -top-4" delay={0.3} />
      <FloatChip label="Tailwind" dot="bg-cyan-400" className="right-[12%] -bottom-4" delay={0.9} />

      {/* floating info cards */}
      <InfoCard
        icon={Rocket}
        title="5+ Projects"
        text="Shipped end-to-end"
        tone="bg-neon-purple/20 text-neon-purple"
        className="hidden sm:flex -right-3 top-6 sm:-right-14"
      />
      <InfoCard
        icon={Briefcase}
        title="Corvit Networks"
        text="6-month internship"
        tone="bg-neon-pink/20 text-neon-pink"
        className="hidden sm:flex -left-3 bottom-12 sm:-left-14"
        delay={0.8}
      />
    </div>
  );
}

/* ---------- section ---------- */

export default function Hero() {
  const typed = useTypewriter(TYPED_TITLES);
  const nameWords = PROFILE.name.split(' ');

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* items-start: right column begins at the same top line as the left text */}
      <div className="mx-auto grid w-full max-w-6xl items-start gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: text (centered on mobile, left-aligned on desktop) */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to freelance &amp; full-time roles
          </motion.span>

          <p className="mt-7 font-mono text-sm tracking-widest text-neon-pink">&lt;hello world /&gt;</p>

          <h1 className="mt-3 font-display text-5xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {nameWords.map((word, i) => (
              <span key={word} className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`block ${i === 1 ? 'text-gradient' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5 h-9 font-display text-lg font-bold text-slate-200 sm:text-2xl"
          >
            {typed}
            <span className="ml-1 inline-block h-6 w-0.5 translate-y-1 animate-blink bg-neon-pink" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0"
          >
            I build fast, scalable and beautifully designed web applications with the MERN stack,
            turning ideas into polished products with clean code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <a href="#work" className="btn-primary">
              Explore Work <ArrowRight size={18} />
            </a>
            {/* <a href={PROFILE.cv} download className="btn-ghost">
              <Download size={18} /> Download CV
            </a> */}
            <a
  href={PROFILE.cv}
  download="Mariam_Mushtaq_CV.pdf"
  className="btn-ghost"
>
  <Download size={18} />
  Download CV
</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
          >
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-neon-pink/60 hover:text-neon-pink"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-8 lg:mx-0"
          >
            {STATS.map(({ to, suffix, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-white">
                  <Counter to={to} suffix={suffix} />
                </p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: photo / video */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 pt-6 sm:px-12 lg:px-10 lg:pt-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
