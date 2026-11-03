import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data';

const SOCIALS = [
  { icon: Github, href: PROFILE.github, label: 'GitHub' },
  { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
  { icon: MessageCircle, href: PROFILE.whatsappHref, label: 'WhatsApp' },
  { icon: Mail, href: PROFILE.emailHref, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-violet font-display text-sm font-black text-white">
              M
            </span>
            <span className="font-display text-sm font-bold tracking-wider text-white">
              MARIAM MUSHTAQ
            </span>
          </a>

          <ul className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-neon-pink">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-neon-pink/60 hover:text-neon-pink"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p>
            Designed &amp; Built by <span className="text-gradient font-semibold">{PROFILE.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
