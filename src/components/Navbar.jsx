import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const offset = window.scrollY + 160;
      let current = '#home';
      NAV_LINKS.forEach(({ href }) => {
        const el = document.querySelector(href);
        if (el && el.offsetTop <= offset) current = href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-8">
        <nav
          className={`flex h-14 items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5 ${
            scrolled ? 'glass bg-black/40 shadow-lg shadow-black/40' : ''
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-violet font-display text-sm font-black text-white shadow-neon">
              M
            </span>
            <span className="font-display text-sm font-bold tracking-wider text-white">
              MARIAM<span className="text-neon-pink">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`relative block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active === href ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active === href && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/80 to-neon-violet/80"
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            <a href="#contact" className="btn-primary hidden !px-5 !py-2 text-sm md:inline-flex">
              Hire Me
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="glass flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 overflow-hidden rounded-2xl bg-black/60 md:hidden"
            >
              <ul className="flex flex-col gap-1 p-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-white/5 ${
                        active === href ? 'bg-white/5 text-neon-pink' : 'text-slate-300'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
