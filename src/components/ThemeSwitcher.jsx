import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';

export const THEMES = [
  { id: 'ocean', label: 'Ocean', swatch: ['#06b6d4', '#6366f1'] },
  { id: 'emerald', label: 'Emerald', swatch: ['#10b981', '#2dd4bf'] },
  { id: 'sunset', label: 'Sunset', swatch: ['#f97316', '#ef4444'] },
  { id: 'orchid', label: 'Orchid', swatch: ['#ff2e9f', '#a855f7'] },
];

const DEFAULT_THEME = 'orchid';
const STORAGE_KEY = 'pf_theme';

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.some((t) => t.id === saved) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(readStoredTheme);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change color theme"
        aria-expanded={open}
        className="glass flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:border-neon-pink/60 hover:text-neon-pink"
      >
        <Palette size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="glass absolute right-0 top-12 z-50 w-44 rounded-2xl bg-black/80 p-2 shadow-xl"
          >
            <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              Color theme
            </p>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10"
              >
                <span
                  className="h-5 w-5 rounded-full ring-1 ring-white/20"
                  style={{ backgroundImage: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})` }}
                />
                {t.label}
                {theme === t.id && <Check size={14} className="ml-auto text-neon-pink" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
