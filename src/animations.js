// Reusable scroll-reveal presets. Spread them onto a motion element:
//   <motion.div {...slideLeft()} />   <SpotlightCard {...flipIn(i)} />

const viewport = { once: true, margin: '-80px' };
const ease = [0.22, 1, 0.36, 1];

export const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { duration: 0.7, delay: i * 0.1, ease },
});

export const slideLeft = (i = 0) => ({
  initial: { opacity: 0, x: -70 },
  whileInView: { opacity: 1, x: 0 },
  viewport,
  transition: { duration: 0.8, delay: i * 0.1, ease },
});

export const slideRight = (i = 0) => ({
  initial: { opacity: 0, x: 70 },
  whileInView: { opacity: 1, x: 0 },
  viewport,
  transition: { duration: 0.8, delay: i * 0.1, ease },
});

// 3D card flip-in (used for Services)
export const flipIn = (i = 0) => ({
  initial: { opacity: 0, rotateX: -65, y: 50, transformPerspective: 900 },
  whileInView: { opacity: 1, rotateX: 0, y: 0 },
  viewport,
  transition: { duration: 0.9, delay: i * 0.12, ease },
});

// Zoom + un-blur (used for Skills)
export const zoomBlur = (i = 0) => ({
  initial: { opacity: 0, scale: 0.85, filter: 'blur(12px)' },
  whileInView: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  viewport,
  transition: { duration: 0.8, delay: i * 0.12, ease },
});
