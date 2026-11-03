# Mariam Mushtaq — Portfolio

Dark purple/pink glassmorphism portfolio built with React (Vite), Tailwind CSS,
Framer Motion and Lucide icons, plus an optional Express API for the contact form.

## Run the frontend

```bash
npm install
npm run dev          # http://localhost:5173
```

## Make the contact form work (choose ONE)

### Option A — Web3Forms (easiest, no backend)
1. Open https://web3forms.com, enter your email, and get your Access Key.
2. Copy `.env.example` to `.env` in the project root and paste the key:
   `VITE_WEB3FORMS_KEY=your_key_here`
3. Restart `npm run dev`. Messages arrive in your inbox. This also works after deployment.

### Option B — Express + Gmail
1. Google Account → Security → turn on 2-Step Verification → App passwords → create one.
2. In `server/`: `npm install`, copy `.env.example` to `.env`, set `EMAIL_PASS` to that
   16-character app password (no spaces).
3. `npm run dev` inside `server/`. The terminal prints "Email login OK" when it works.

## Edit your content

- `src/data.js`: LinkedIn URL, project demo/GitHub links, skills, services.
- Hero photo / video (right side): put ONE file in `public/`. The first one found is used, in this order:
  `hero.webm`, `hero.mp4` (looping muted video, e.g. a walking 3D character),
  then `hero.png`, `hero.webp`, `hero.jpg`, `profile.jpg`, `profile.png` (photo).
  Portrait 4:5 works best (e.g. 800x1000). Initials "MM" show if nothing is found.
- `public/Mariam_Mushtaq_CV.pdf`: your CV for the "Download CV" button.

## Color theme

The palette button in the navbar switches between Ocean (default), Emerald, Sunset and Orchid
(the original pink/purple). The choice is remembered in the browser. To add or change a palette,
edit the `[data-theme='...']` blocks at the top of `src/index.css` (and `THEMES` in
`src/components/ThemeSwitcher.jsx`). Change the default via `data-theme` in `index.html`.

## Contact links

- Phone number → opens WhatsApp chat (`wa.me`).
- Email → opens Gmail compose (works without a desktop mail app).
