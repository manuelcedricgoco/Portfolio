import { SectionLink } from '@/components/SectionLink';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';

export function Logo({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <SectionLink
      section="home"
      onNavigate={onNavigate}
      aria-label={`${profile.initials} — back to top`}
      className={cn('group inline-flex items-baseline rounded-md text-[1.4rem] font-semibold tracking-tight text-fg', className)}
    >
      {profile.initials}
      <span className="text-accent-text transition-transform duration-200 group-hover:-translate-y-0.5">.</span>
    </SectionLink>
  );
}
