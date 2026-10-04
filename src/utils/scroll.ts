export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Smooth-scrolls to a section, updates the URL hash, and moves focus there for keyboard / screen-reader users. */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });

  // Keep React Router's history state intact while making the URL shareable.
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}#${id}`,
  );

  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  return true;
}
