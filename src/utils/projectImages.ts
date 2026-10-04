import type { Project } from '@/data/types';

/**
 * Screenshots are discovered automatically: drop image files into
 *   src/assets/images/projects/<project-slug>/
 * and they appear on the project card and case-study page. Files are ordered by name,
 * so prefix them with numbers (01-dashboard.webp, 02-reports.webp). The first image is the cover.
 * The caption is built from the file name ("02-event-calendar.webp" → "Event calendar").
 */
const modules = import.meta.glob<string>('/src/assets/images/projects/*/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export type ProjectImage = {
  src: string;
  caption: string;
  file: string;
};

const byFolder = new Map<string, ProjectImage[]>();

for (const [path, src] of Object.entries(modules)) {
  const match = path.match(/projects\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const folder = match[1];
  const file = match[2];

  const words = file
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_.\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  const caption = words ? words.charAt(0).toUpperCase() + words.slice(1) : 'Screenshot';

  const list = byFolder.get(folder) ?? [];
  list.push({ src, caption, file });
  byFolder.set(folder, list);
}

for (const list of byFolder.values()) {
  list.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
}

export function getProjectImages(project: Pick<Project, 'slug'>): ProjectImage[] {
  return byFolder.get(project.slug) ?? [];
}
