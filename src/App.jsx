import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import BackToTop from './components/BackToTop';
import SectionDivider from './components/SectionDivider';
import Preloader from './components/Preloader';

export default function App() {
  // The intro curtain shows once per browser session
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('pf_loaded');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem('pf_loaded', '1');
      } catch {
        /* ignore */
      }
    }, 1600);
    return () => clearTimeout(t);
  }, [loading]);

  // If the page was opened with a #hash (e.g. /#work), jump there once content is mounted
  useEffect(() => {
    if (loading || !window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    if (el) setTimeout(() => el.scrollIntoView(), 80);
  }, [loading]);

  return (
    <div className="relative min-h-screen">
      {/* Background: subtle grid + two soft aurora lights */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-12%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[170px]" />
        <div className="absolute right-[-12%] top-[45%] h-[420px] w-[420px] rounded-full bg-neon-pink/10 blur-[170px]" />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <div key="app">
            <ScrollProgress />
            <CursorGlow />
            <Navbar />

            <main className="relative z-10">
              <Hero />
              <Marquee />
              <About />
              <SectionDivider />
              <Services />
              <SectionDivider />
              <Work />
              <SectionDivider />
              <Contact />
            </main>

            <Footer />
            <BackToTop />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
