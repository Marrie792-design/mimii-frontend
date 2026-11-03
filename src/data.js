// Central place to edit your content.

const WA_NUMBER = '923217587549';
const WA_TEXT = 'Hi Mariam, I saw your portfolio and would like to connect.';

export const PROFILE = {
  name: 'Mariam Mushtaq',
  email: 'marrie9642@gmail.com',
  // Opens Gmail compose directly (works even without a desktop mail app)
  emailHref:
    'https://mail.google.com/mail/?view=cm&fs=1&to=marrie9642@gmail.com&su=' +
    encodeURIComponent('Portfolio Inquiry'),
  phone: '+92 321 7587549',
  // Clicking the number opens WhatsApp chat
  whatsappHref: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`,
  location: 'Lahore, Pakistan',
  github: 'https://github.com/Marrie792-design',
  linkedin: 'https://www.linkedin.com/in/mariam-mushtaq-7a8a42369/', // TODO: replace
  cv: '/Mariam_Mushtaq_CV.pdf', // put your CV in /public with this name
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export const TYPED_TITLES = ['MERN Stack Developer', 'Full-Stack Engineer'];

export const TECH_MARQUEE = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'JavaScript ES6+',
  'Tailwind CSS',
  'Framer Motion',
  'REST APIs',
  'JWT Auth',
  'Gemini API',
  'Git & GitHub',
];

export const SKILLS = [
  {
    category: 'Frontend',
    icon: 'code',
    items: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    icon: 'server',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Auth', 'Gemini API'],
  },
  {
    category: 'Database',
    icon: 'database',
    items: ['MongoDB', 'Mongoose', 'MySQL', 'Schema Design'],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    items: ['Git & GitHub', 'Vite', 'Postman', 'VS Code', 'npm'],
  },
];

export const SERVICES = [
  {
    icon: 'layers',
    title: 'Full-Stack Web Development',
    text: 'End-to-end MERN applications, from database design and secure APIs to polished, production-ready interfaces.',
    points: ['MERN architecture', 'Auth & admin panels', 'Deployment ready'],
  },
  {
    icon: 'code',
    title: 'Frontend Development',
    text: 'Fast, responsive React interfaces styled with Tailwind CSS and brought to life with smooth animations.',
    points: ['React + Tailwind', 'Pixel-perfect UI', 'Smooth animations'],
  },
  {
    icon: 'server',
    title: 'RESTful API & Backend Integration',
    text: 'Clean Express.js APIs with authentication, validation and third-party integrations such as AI services.',
    points: ['Express REST APIs', 'JWT security', 'AI / 3rd-party APIs'],
  },
  {
    icon: 'palette',
    title: 'UI/UX & Glassmorphic Design',
    text: 'Modern, aesthetic interfaces with thoughtful UX that feel premium on every screen size.',
    points: ['Design systems', 'Glassmorphism', 'Mobile-first'],
  },
];

export const PROJECTS = [
  {
    title: 'Marrie Mart',
    category: 'E-Commerce Platform',
    icon: 'bag',
    description:
      'Full e-commerce platform with secure JWT authentication, product catalogue, cart and checkout, plus an admin dashboard for managing products and orders.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
    demo: 'https://marrie-mart.vercel.app/',
    image: '/projects/marrie-mart.png',
    github: 'https://github.com/Marrie792-design/MarrieMart',
    featured: true,
  },
  {
    title: 'Sugar Bloom',
    category: 'Bakery Boutique',
    icon: 'cake',
    description:
      'Bakery boutique platform with a custom ordering system where customers design their order, choose flavours and schedule delivery.',
    tech: ['React.js', 'MySQL'],
    demo: 'https://sugar-bloom-kzarlish792-7686s-projects.vercel.app/',
    image: '/projects/sugar-bloom.png',
    github: 'https://github.com/Marrie792-design/Sugar-Bloom',
  },
  {
    title: 'Meridian Luxe',
    category: 'Luxury Travel Portal',
    icon: 'plane',
    description:
      'Luxury travel portal with advanced search filters, destination browsing and an end-to-end booking flow.',
    tech: ['React.js', 'Node.js'],
    demo: 'https://travel-frontend-nu-gilt.vercel.app/',
    image: '/projects/meridian-luxe.png',
    github: 'https://github.com/Marrie792-design/Travel-Frontend',
  },
  {
    title: 'JusticeLens',
    category: 'AI Legal Assistant',
    icon: 'scale',
    description:
      'AI-powered legal assistant built on the Gemini API that explains legal questions in plain language.',
    tech: ['React.js', 'Gemini API'],
    demo: 'https://justice-lens-frontend.vercel.app/',
    image: '/projects/justicelens.png',
    github: 'https://github.com/Marrie792-design/JusticeLens-frontend',
  },
  {
    title: 'Event Horizon',
    category: 'Event Dashboard',
    icon: 'ticket',
    description:
      'Event management dashboard with ticket management: create events, track ticket sales and manage attendees in one place.',
    tech: ['React.js', 'Node.js'],
    demo: 'https://event-horizon-frontend-oh83.vercel.app/',
    image: '/projects/event-horizon.png',
    github: 'https://github.com/Marrie792-design/EventHorizon-frontend',
  },
];
