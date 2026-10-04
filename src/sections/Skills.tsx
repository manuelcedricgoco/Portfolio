import { Monitor, Server, Smartphone, Wrench, type LucideIcon } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { SkillCard } from '@/components/SkillCard';
import { skillCategories } from '@/data/skills';
import type { SkillIconKey } from '@/data/types';

const categoryIcons: Record<SkillIconKey, LucideIcon> = {
  monitor: Monitor,
  server: Server,
  smartphone: Smartphone,
  wrench: Wrench,
};

/** Layout per category id (12-column bento on large screens). Unknown ids fall back to half width. */
const layout: Record<string, { span: string; grid: string }> = {
  frontend: { span: 'lg:col-span-7', grid: 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' },
  backend: { span: 'lg:col-span-5', grid: 'grid-cols-1 min-[420px]:grid-cols-2' },
  mobile: { span: 'lg:col-span-5', grid: 'grid-cols-1 min-[420px]:grid-cols-2' },
  tools: { span: 'lg:col-span-7', grid: 'grid-cols-2 sm:grid-cols-3' },
};
const fallbackLayout = { span: 'lg:col-span-6', grid: 'grid-cols-2 sm:grid-cols-3' };

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        title="Skills & Technologies"
        description="The tools I use to design, build, and ship web and mobile software."
      />

      <RevealGroup className="grid gap-5 lg:grid-cols-12" stagger={0.08}>
        {skillCategories.map((category) => {
          const Icon = categoryIcons[category.icon];
          const { span, grid } = layout[category.id] ?? fallbackLayout;
          const headingId = `skills-${category.id}`;
          return (
            <RevealItem key={category.id} className={span}>
              <section aria-labelledby={headingId} className="h-full rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-line bg-elevated text-accent-text">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 id={headingId} className="text-lg leading-tight font-semibold">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted">{category.description}</p>
                  </div>
                </div>
                <ul className={`mt-5 grid gap-2.5 ${grid}`}>
                  {category.items.map((name) => (
                    <SkillCard key={name} name={name} />
                  ))}
                </ul>
              </section>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-6 text-sm text-faint">Listed as technologies I work with — not ratings or percentages.</p>
      </Reveal>
    </Section>
  );
}
