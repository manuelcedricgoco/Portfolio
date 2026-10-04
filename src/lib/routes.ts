/** Loader for the code-split case-study page, shared so it can also be prefetched. */
export const loadProjectDetails = () => import('@/pages/ProjectDetails');

/** Fire-and-forget prefetch, e.g. when someone hovers or focuses a "View Case Study" link. */
export const prefetchProjectDetails = () => {
  void loadProjectDetails().catch(() => undefined);
};

/**
 * If the visitor lands directly on a case study (shared link, reload), fetch its chunk before the first
 * render so the real page — not the loading skeleton — is on screen when scroll restoration runs.
 */
export function preloadInitialRoute(): Promise<unknown> {
  if (/\/projects\//.test(window.location.pathname)) return loadProjectDetails().catch(() => undefined);
  return Promise.resolve();
}
