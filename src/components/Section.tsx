import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type SectionProps = {
  id: string;
  /** id of the heading inside the section, used as its accessible name */
  labelledBy: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, labelledBy, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative [scroll-margin-top:-3rem] py-20 sm:py-24 lg:py-28', className)}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-page">{children}</div>
    </section>
  );
}
