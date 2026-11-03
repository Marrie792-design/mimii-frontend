import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { PROFILE } from '../data';
import { slideLeft, slideRight } from '../animations';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Optional: free access key from https://web3forms.com (no backend needed).
// If it is not set, the form falls back to the Express API at /api/contact.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please enter your name (min 2 characters).';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

async function sendMessage(values) {
  if (WEB3FORMS_KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New portfolio message from ${values.name}`,
        from_name: 'Portfolio Contact Form',
        ...values,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || 'Could not send your message.');
    return;
  }

  const res = await fetch('https://mimii-backend.vercel.app/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(values),
});

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      data.error ||
        'Could not reach the contact server. Make sure it is running (cd server && npm run dev).'
    );
  }
}

// Phone row opens a WhatsApp chat; email row opens Gmail compose.
const INFO = [
  {
    icon: MessageCircle,
    label: 'Phone / WhatsApp',
    value: PROFILE.phone,
    href: PROFILE.whatsappHref,
  },
  { icon: Mail, label: 'Email', value: PROFILE.email, href: PROFILE.emailHref },
  { icon: Github, label: 'GitHub', value: 'github.com/Marrie792-design', href: PROFILE.github },
  { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: PROFILE.linkedin },
  { icon: MapPin, label: 'Location', value: PROFILE.location },
];

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState('');

  const errors = validate(values);

  const handleChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const fieldClass = (field) =>
    `input-field ${
      touched[field] && errors[field]
        ? 'border-red-500/70'
        : touched[field] && !errors[field]
        ? 'border-emerald-400/50'
        : 'border-white/10 focus:border-neon-pink'
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;

    setStatus('sending');
    setServerError('');
    try {
      await sendMessage(values);
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
      setTouched({});
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHeading
        index="04"
        eyebrow="Contact"
        title="Let's work together"
        subtitle="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Info */}
        <motion.div
          {...slideLeft()}
          className="glass rounded-2xl p-7 lg:col-span-2"
        >
          <h3 className="font-display text-xl font-bold text-white">Let&apos;s build something</h3>
          <p className="mt-2 text-sm text-slate-400">
            Reach out through the form or any of the channels below.
          </p>

          <ul className="mt-6 space-y-3">
            {INFO.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon-pink/15 text-neon-pink transition-colors group-hover:bg-neon-pink group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-slate-500">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-slate-200">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-2">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={PROFILE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-400/20"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          {...slideRight()}
          className="glass space-y-5 rounded-2xl p-7 lg:col-span-3"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass('name')}
            />
            {touched.name && errors.name && (
              <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={fieldClass('email')}
            />
            {touched.email && errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${fieldClass('message')} resize-none`}
            />
            {touched.message && errors.message && (
              <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary w-full disabled:opacity-60"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-300">
              <CheckCircle2 size={18} /> Thanks! Your message has been sent. I&apos;ll reply soon.
            </p>
          )}
          {status === 'error' && (
            <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
              <p>{serverError}</p>
              <a
                href={PROFILE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-semibold underline underline-offset-4 hover:text-white"
              >
                Message me on WhatsApp instead
              </a>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
