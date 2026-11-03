/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // All colors come from CSS variables (see src/index.css) so the theme
        // can be switched at runtime. neon.pink/purple/violet = accent slots a/b/c.
        void: 'rgb(var(--c-void) / <alpha-value>)',
        neon: {
          pink: 'rgb(var(--c-a) / <alpha-value>)',
          purple: 'rgb(var(--c-b) / <alpha-value>)',
          violet: 'rgb(var(--c-c) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 24px rgb(var(--c-a) / 0.45)',
        purple: '0 0 24px rgb(var(--c-b) / 0.45)',
      },
      keyframes: {
        blink: { '0%,50%': { opacity: 1 }, '51%,100%': { opacity: 0 } },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
