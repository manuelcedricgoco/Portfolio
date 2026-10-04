import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';

type SectionHeadingProps = {
  /** Becomes the h2 id; pass the same value to <Section labelledBy> */
  id: string;
  title: string;
  description?: ReactNode;
  /** "compact" removes the large gap below, for headings that sit inside a column */
  size?: 'default' | 'compact';
  className?: string;
};

export function SectionHeading({ id, title, description, size = 'default', className }: SectionHeadingProps) {
  return (
    <div className={cn(size === 'default' ? 'mb-10 md:mb-14' : 'mb-8', className)}>
      <Reveal className="max-w-2xl">
        <h2 id={id} className="text-[1.9rem] leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-[58ch] text-base text-muted sm:text-lg">{description}</p>}
      </Reveal>
    </div>
  );
}
