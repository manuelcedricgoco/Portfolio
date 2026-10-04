import { SmartImage } from '@/components/SmartImage';
import { profile } from '@/data/profile';
import portrait from '@/assets/images/profile.jpg';

/**
 * Framed portrait that sits above the code panel, right-aligned, fully visible.
 */
export function HeroPortrait() {
  return (
    <div className="relative ml-auto w-[58%] max-w-[13rem] sm:max-w-[14rem] lg:w-[44%]">
      <div
        aria-hidden="true"
        className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-accent/20 blur-2xl"
      />
      <div className="rounded-2xl border border-line-strong bg-surface p-1.5 shadow-[var(--shadow-panel)]">
        <SmartImage
          src={portrait}
          alt={`Portrait of ${profile.name}`}
          eager
          className="aspect-square rounded-xl"
          imgClassName="object-top"
        />
      </div>
    </div>
  );
}
