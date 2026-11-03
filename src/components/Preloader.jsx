import { motion } from 'framer-motion';

// Intro screen that slides up like a curtain when loading finishes
export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink to-neon-violet font-display text-2xl font-black text-white shadow-neon"
      >
        M
      </motion.div>

      <div className="mt-8 h-[2px] w-44 overflow-hidden rounded bg-white/10">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
          className="h-full w-full bg-gradient-to-r from-neon-pink to-neon-violet"
        />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
        Loading portfolio
      </p>
    </motion.div>
  );
}
