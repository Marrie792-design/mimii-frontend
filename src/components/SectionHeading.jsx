import { motion } from 'framer-motion';

export default function SectionHeading({ index, eyebrow, title, subtitle }) {
  const words = title.split(' ');

  return (
    <div className="relative mb-14 text-center">
      {/* big outlined section number behind the title */}
      <div className="pointer-events-none absolute inset-x-0 top-[-2.5rem] flex justify-center" aria-hidden="true">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="select-none font-display text-[7rem] font-black leading-none text-transparent sm:text-[9rem] [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
        >
          {index}
        </motion.span>
      </div>

      <div className="relative">
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-neon-pink">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px w-8 origin-right bg-neon-pink/60"
          />
          {index} / {eyebrow}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px w-8 origin-left bg-neon-pink/60"
          />
        </span>

        {/* title: each word slides up out of a mask */}
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-slate-400"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
