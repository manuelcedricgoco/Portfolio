import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, revealTransition, staggerContainer } from '@/lib/variants';

const viewport = { once: true, margin: '0px 0px -10% 0px' } as const;
const defaultContainer = staggerContainer();

type RevealProps = { children: ReactNode; className?: string; delay?: number };

/** Fades a block in once as it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}

/** Parent that staggers its RevealItem children. */
export function RevealGroup({ children, className, stagger }: RevealProps & { stagger?: number }) {
  return (
    <m.div
      className={className}
      variants={stagger === undefined ? defaultContainer : staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={fadeUp} transition={revealTransition}>
      {children}
    </m.div>
  );
}

export function RevealListItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.li className={className} variants={fadeUp} transition={revealTransition}>
      {children}
    </m.li>
  );
}
