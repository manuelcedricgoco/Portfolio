import type { SkillCategory } from './types';

/** Names map to brand icons in src/assets/icons/techIcons.ts (see TechIcon.tsx for aliases). */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces and client-side logic',
    icon: 'monitor',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'React Vite', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend / Systems',
    description: 'Server-side logic and databases',
    icon: 'server',
    items: ['PHP', 'Node.js / Express', 'MySQL', 'SQLite'],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    description: 'Cross-platform apps',
    icon: 'smartphone',
    items: ['React Native', 'Expo'],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Everyday development workflow',
    icon: 'wrench',
    items: ['Git', 'GitHub', 'VS Code', 'XAMPP', 'Postman', 'Figma'],
  },
];
