import type { Service } from './types';

/**
 * Areas of development interest and capability — drawn from academic and personal projects,
 * not commercial client work. `examples` are project slugs from projects.ts.
 */
export const services: Service[] = [
  {
    title: 'Web Applications',
    description: 'Responsive web applications and information systems.',
    icon: 'globe',
    examples: ['sems', 'bms', 'mtpms'],
  },
  {
    title: 'Management Systems',
    description: 'Systems for organizations, schools, barangays, and other workflows.',
    icon: 'layers',
    examples: ['sems', 'bms'],
  },
  {
    title: 'Dashboard Interfaces',
    description: 'Administrative dashboards with charts, tables, filters, and data visualization.',
    icon: 'layout-dashboard',
    examples: ['bms', 'mtpms'],
  },
  {
    title: 'UI Implementation',
    description: 'Modern responsive interfaces using React, Tailwind CSS, HTML, CSS, and JavaScript.',
    icon: 'palette',
    status: 'This portfolio',
  },
  {
    title: 'Mobile Applications',
    description: 'React Native / Expo applications.',
    icon: 'smartphone',
    status: 'Currently learning',
  },
];
