import { motion } from 'framer-motion';

// Glowing line that draws itself between sections
export default function SectionDivider() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8" aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        className="h-px w-full bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent"
      />
    </div>
  );
}
