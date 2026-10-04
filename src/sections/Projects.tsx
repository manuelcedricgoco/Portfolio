import { AnimatePresence, m } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { filterProjects, projects } from '@/data/projects';
import { PROJECT_FILTERS, type ProjectFilter } from '@/data/types';
import { cn } from '@/utils/cn';

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const visible = useMemo(() => filterProjects(filter), [filter]);
  // An odd number of results lets the first card span the full width without leaving a gap.
  const featuredFirst = visible.length % 2 === 1;

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        title="Featured Projects"
        description="Real systems built for schools, barangays, and environmental programs. Open a case study for the problem, solution, features, and source code."
      />

      <Reveal>
        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((option) => {
            const selected = filter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(option)}
                className={cn(
                  'relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  selected ? 'border-transparent text-accent-fg' : 'border-line text-muted hover:border-line-strong hover:text-fg',
                )}
              >
                {selected && (
                  <m.span
                    layoutId="project-filter-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{option}</span>
                <span className="relative ml-1.5 text-xs tabular-nums">{filterProjects(option).length}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <p role="status" className="sr-only">
        Showing {visible.length} of {projects.length} projects
      </p>

      <ul className="relative grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <ProjectCard key={project.slug} project={project} featured={featuredFirst && index === 0} index={index} />
          ))}
        </AnimatePresence>
      </ul>

      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-medium">No projects in this category yet.</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={() => setFilter('All')}>
            Show all projects
          </Button>
        </div>
      )}
    </Section>
  );
}
