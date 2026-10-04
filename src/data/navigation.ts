export const navLinks = [
  { label: 'Home', section: 'home' },
  { label: 'About', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Projects', section: 'projects' },
  { label: 'Journey', section: 'journey' },
  { label: 'Contact', section: 'contact' },
] as const;

/** Stable list used by the scroll-spy hook. */
export const NAV_SECTION_IDS: string[] = navLinks.map((link) => link.section);

export const footerLinks = [
  { label: 'Home', section: 'home' },
  { label: 'About', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact', section: 'contact' },
] as const;
