import { GraduationCap } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { profile } from '@/data/profile';

/** Rendered beside the journey timeline (see Journey.tsx). Edit the details in src/data/profile.ts. */
export function Education() {
  const { degree, level, campus, status } = profile.education;
  const details = [
    { label: 'Level', value: level },
    { label: 'Campus', value: campus },
    { label: 'Status', value: status },
  ];

  return (
    <section id="education" aria-labelledby="education-title" className="lg:sticky lg:top-28">
      <SectionHeading id="education-title" title="Education" size="compact" />
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <div className="flex items-start gap-4 p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-elevated text-accent-text">
              <GraduationCap className="size-6" aria-hidden="true" />
            </span>
            <h3 className="text-xl leading-snug font-semibold">{degree}</h3>
          </div>
          <dl className="border-t border-line">
            {details.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-line px-6 py-3.5 last:border-b-0">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-right font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
