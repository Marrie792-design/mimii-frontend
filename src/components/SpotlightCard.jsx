import { useRef } from 'react';
import { motion } from 'framer-motion';

// Card whose border/background glows where the mouse is.
// Extra props (initial, whileInView, transition...) go straight to motion.div.
export default function SpotlightCard({ className = '', children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -6 }}
      className={`spotlight ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
