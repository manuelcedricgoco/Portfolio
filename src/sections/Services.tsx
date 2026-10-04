import { Globe, Info, Layers, LayoutDashboard, Palette, Smartphone, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealListItem } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { getProject } from '@/data/projects';
import { services } from '@/data/services';
import type { ServiceIconKey } from '@/data/types';
import { cn } from '@/utils/cn';

const icons: Record<ServiceIconKey, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  'layout-dashboard': LayoutDashboard,
  palette: Palette,
  smartphone: Smartphone,
};

export function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        title="What I Can Build"
        description="Areas I’m focused on, with the projects that show each one."
      />

      {/* Cells share 1px borders; five cards fill a 6-column grid exactly (3 + 2). */}
      <RevealGroup className="overflow-hidden rounded-2xl border border-line bg-line" stagger={0.06}>
        <ul className="grid gap-px md:grid-cols-6">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <RevealListItem key={service.title} className={cn('bg-surface p-6 sm:p-7', index < 3 ? 'md:col-span-2' : 'md:col-span-3')}>
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-elevated text-accent-text">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{service.description}</p>
                <p className="mt-5 text-sm text-faint">
                  {service.examples ? (
                    <>
                      Seen in{' '}
                      {service.examples.map((slug, i) => {
                        const project = getProject(slug);
                        if (!project) return null;
                        return (
                          <span key={slug}>
                            {i > 0 && ', '}
                            <Link to={`/projects/${slug}`} className="font-medium text-accent-text underline-offset-2 hover:underline">
                              {project.shortTitle}
                            </Link>
                          </span>
                        );
                      })}
                    </>
                  ) : (
                    service.status
                  )}
                </p>
              </RevealListItem>
            );
          })}
        </ul>
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-5 flex max-w-3xl items-start gap-2 text-sm text-faint">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          These are areas of development interest and capability, based on academic and personal projects — not commercial client work.
        </p>
      </Reveal>
    </Section>
  );
}
