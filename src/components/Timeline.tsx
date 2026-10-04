import { m, useReducedMotion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import type { JourneyItem } from '@/data/types';
import { RevealGroup, RevealListItem } from '@/components/Reveal';
import { cn } from '@/utils/cn';

/** Vertical timeline whose accent line fills as you scroll through it. */
export function Timeline({ items }: { items: JourneyItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });

  return (
    <div ref={ref} className="relative">
      {/* line: grey track + accent fill, centred under the marker column */}
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[0.875rem] w-px -translate-x-1/2 bg-line md:left-[9.25rem]" />
      <m.span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[0.875rem] w-px origin-top -translate-x-1/2 bg-accent md:left-[9.25rem]"
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
      />

      <RevealGroup>
        <ol className="relative">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <RevealListItem key={`${item.period}-${item.title}`} className="grid grid-cols-[1.75rem_1fr] md:grid-cols-[8rem_2.5rem_1fr]">
                <p className="hidden pt-0.5 text-right text-base font-medium text-muted tabular-nums md:block">{item.period}</p>
                <div className="flex justify-center">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-2 size-3 rounded-full border-2 bg-bg ring-4 ring-bg',
                      isLast ? 'border-line-strong' : 'border-accent',
                    )}
                  />
                </div>
                <div className={cn('pl-2 md:pl-0', !isLast && 'pb-12')}>
                  <p className="text-sm font-medium text-muted tabular-nums md:hidden">{item.period}</p>
                  <h3 className="text-lg font-semibold sm:text-xl">{item.title}</h3>
                  <p className="mt-2 max-w-[56ch] text-[0.95rem] text-muted">{item.description}</p>
                </div>
              </RevealListItem>
            );
          })}
        </ol>
      </RevealGroup>
    </div>
  );
}
