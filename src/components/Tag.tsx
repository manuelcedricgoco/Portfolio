import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Tag({ children, accent = false, className }: { children: ReactNode; accent?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.72rem] leading-5',
        accent ? 'border-accent/30 bg-accent-soft text-accent-text' : 'border-line bg-elevated/60 text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
