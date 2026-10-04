import { AnimatePresence, m } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/utils/scroll';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
          className="fixed right-4 bottom-5 z-40 inline-flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface/90 text-muted shadow-lg backdrop-blur transition-colors hover:border-accent/60 hover:text-fg sm:right-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
