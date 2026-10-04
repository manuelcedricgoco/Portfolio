import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

/**
 * - `m` components + LazyMotion keep the animation runtime out of the first bundle.
 * - reducedMotion="user" turns transform/layout animations off when the visitor's
 *   OS asks for reduced motion (opacity fades are kept).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
