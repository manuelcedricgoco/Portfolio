/** Base URL configured by Vite ("/" by default, "/repo-name/" for GitHub Pages project sites). */
export const BASE = import.meta.env.BASE_URL;

/** React Router basename (no trailing slash), or undefined when served from the domain root. */
export const routerBasename = BASE === '/' ? undefined : BASE.replace(/\/$/, '');

/** Real href for an in-page section link, e.g. "/#projects". */
export const sectionHref = (id: string) => `${BASE}#${id}`;
