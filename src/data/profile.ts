import type { Profile } from './types';

/**
 * Single source of truth for personal details — edit here and the whole site updates.
 * Leave `email` or `linkedin` empty to keep them hidden until you're ready to publish them.
 */
export const profile: Profile = {
  name: 'Manuel Cedric Goco',
  initials: 'MCG',
  role: 'Software Developer',
  badge: 'BSIT Student • Full-Stack Development • UI/UX',
  headline: 'Building Digital Solutions for Real-World Problems.',
  intro:
    'I’m Manuel Cedric Goco, a BSIT student and aspiring software developer focused on building practical, user-friendly information systems and modern web applications.',
  closing: 'I don’t just learn technology. I use technology to build useful systems.',
  location: 'Philippines',

  // ── Contact (fill these in) ─────────────────────────────────────────────
  email: 'manuelcedricgoco64@gmail.com', // e.g. 'name@example.com'
  github: 'https://github.com/manuelcedricgoco',
  githubUsername: 'manuelcedricgoco',
  linkedin: 'https://www.linkedin.com/in/manuel-cedric-goco', // e.g. 'https://www.linkedin.com/in/your-handle'

  focus: ['Web Development', 'System Development', 'UI/UX'],

  // ── Education (no school name, awards, or dates are invented) ───────────
  education: {
    degree: 'Bachelor of Science in Information Technology',
    short: 'BSIT',
    level: 'BSIT 3A',
    campus: 'Mamburao Campus',
    status: 'Currently enrolled',
  },

  currentlyLearning: [
    'React',
    'TypeScript',
    'JavaScript',
    'PHP',
    'MySQL',
    'React Native',
    'Git',
    'GitHub',
    'Tailwind CSS',
  ],

  about: {
    title: 'Turning Ideas Into Working Systems',
    paragraphs: [
      'I’m a Bachelor of Science in Information Technology student with a focus on web and software development. I like taking a real workflow — events, records, reports — and turning it into a system people can actually use.',
      'My projects focus on real organizational and community problems: a school event platform, a barangay management system, and an environmental monitoring tool. Each one started with a practical need, and each is built to be clear for the people who run it every day.',
    ],
  },

  contact: {
    title: 'Let’s Build Something Useful',
    text: 'Have a project, internship opportunity, or collaboration in mind? Feel free to reach out.',
  },
};
