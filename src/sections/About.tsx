import { BookOpen, GraduationCap, Layers, MapPin } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { TechIcon } from '@/components/TechIcon';
import { profile } from '@/data/profile';

const facts = [
  { icon: GraduationCap, label: 'Education', value: profile.education.degree },
  { icon: Layers, label: 'Focus', value: 'Web & Software Development' },
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: BookOpen, label: 'Currently', value: 'BSIT Student' },
];

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-7">
          <SectionHeading id="about-title" title={profile.about.title} size="compact" />

          <RevealGroup className="space-y-5 text-base text-muted sm:text-lg" stagger={0.1}>
            {profile.about.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p className="max-w-[62ch]">{paragraph}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <blockquote className="mt-10 max-w-[34ch] border-l-2 border-accent pl-5 text-xl leading-snug font-medium sm:text-2xl">
              {profile.closing}
            </blockquote>
          </Reveal>
        </div>

        <div className="min-w-0 space-y-6 lg:col-span-5 lg:pt-3">
          <Reveal>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-surface p-5">
                  <Icon className="size-5 text-accent-text" aria-hidden="true" />
                  <dt className="mt-4 text-sm text-muted">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-base font-semibold">Currently learning</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {profile.currentlyLearning.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 py-1.5 pr-3 pl-2.5 text-sm text-muted"
                  >
                    <TechIcon name={tech} className="size-4 text-accent-text" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
