import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the last section whose top has passed the (sticky) navbar.
 * Uses one passive scroll listener throttled with requestAnimationFrame.
 */
export function useActiveSection(ids: readonly string[], enabled = true, offset = 100) {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const compute = () => {
      frame = 0;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = ids[ids.length - 1] ?? current;
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, enabled, offset]);

  return active;
}
