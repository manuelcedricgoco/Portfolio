/**
 * Demo videos are discovered automatically: put <slug>.mp4 (and optionally <slug>-poster.webp)
 * in src/assets/videos/projects/ and the matching project shows it instead of a still image.
 */
const videos = import.meta.glob<string>('/src/assets/videos/projects/*.mp4', { eager: true, query: '?url', import: 'default' });
const posters = import.meta.glob<string>('/src/assets/videos/projects/*-poster.{webp,png,jpg}', { eager: true, query: '?url', import: 'default' });

export type ProjectVideo = { src: string; poster?: string };

const bySlug = new Map<string, ProjectVideo>();
for (const [path, src] of Object.entries(videos)) {
  const slug = path.match(/projects\/([^/]+)\.mp4$/)?.[1];
  if (slug) bySlug.set(slug, { src });
}
for (const [path, url] of Object.entries(posters)) {
  const slug = path.match(/projects\/([^/]+)-poster\./)?.[1];
  const entry = slug ? bySlug.get(slug) : undefined;
  if (entry) entry.poster = url;
}

export function getProjectVideo(project: { slug: string }): ProjectVideo | undefined {
  return bySlug.get(project.slug);
}
