import { BookMarked } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import { ButtonLink } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { profile } from '@/data/profile';
import { projects, repoName } from '@/data/projects';

/** Linguist-style dot colours for the languages the repositories are written in. */
const LANGUAGE_COLORS: Record<string, string> = {
  PHP: '#4F5D95',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
};

const normalize = (tech: string) => (tech === 'MySQL / MariaDB' ? 'MySQL' : tech);

// Static, derived from src/data/projects.ts — no GitHub API calls, nothing to keep in sync by hand.
const usage = new Map<string, number>();
for (const project of projects) {
  for (const tech of new Set(project.technologies.map(normalize))) usage.set(tech, (usage.get(tech) ?? 0) + 1);
}
const columns = [...usage.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tech]) => tech);

export function GithubSection() {
  return (
    <Section id="github" labelledBy="github-title">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            id="github-title"
            title="Code, Projects & Experiments"
            description="Every featured system is open on GitHub, so you can read the source, the structure, and the commit history."
            size="compact"
          />
          <Reveal delay={0.1}>
            <ButtonLink href={profile.github} external size="lg" icon={<GithubIcon className="size-[18px]" />}>
              View my GitHub
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal className="min-w-0 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[var(--shadow-panel)]">
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="grid size-10 place-items-center rounded-full border border-line bg-elevated">
                <GithubIcon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate leading-tight font-medium">{profile.githubUsername}</p>
                <p className="text-sm text-muted">Featured repositories</p>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 text-sm text-accent-text underline-offset-2 hover:underline"
              >
                View profile
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <ul className="divide-y divide-line">
              {projects.map((project) => {
                const languages = project.technologies.filter((tech) => tech in LANGUAGE_COLORS);
                return (
                  <li key={project.slug} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 font-medium break-words text-accent-text underline-offset-2 hover:underline"
                      >
                        <BookMarked className="mt-1 size-4 shrink-0 text-faint" aria-hidden="true" />
                        {repoName(project)}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      <p className="mt-1 text-sm text-muted">{project.title}</p>
                    </div>
                    <ul className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Languages">
                      {languages.map((language) => (
                        <li key={language} className="inline-flex items-center gap-1.5">
                          <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[language] }} />
                          {language}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line p-5">
              <h3 className="text-sm font-semibold">Technology footprint</h3>
              <p className="mt-1 text-sm text-muted">Which technologies each featured repository uses.</p>
              <div
                role="region"
                aria-label="Technology footprint table (scrollable)"
                tabIndex={0}
                className="relative mt-4 overflow-x-auto rounded-md pb-1"
              >
                <table className="border-separate border-spacing-1.5">
                  <caption className="sr-only">Technologies used by each featured repository</caption>
                  <thead>
                    <tr>
                      <td />
                      {columns.map((tech) => (
                        <th key={tech} scope="col" className="pb-2 align-bottom font-normal">
                          <span className="mx-auto block h-[4.75rem] rotate-180 text-xs whitespace-nowrap text-muted [writing-mode:vertical-rl]">
                            {tech}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => {
                      const used = new Set(project.technologies.map(normalize));
                      return (
                        <tr key={project.slug}>
                          <th scope="row" className="pr-3 text-left text-sm font-medium whitespace-nowrap">
                            {project.shortTitle}
                          </th>
                          {columns.map((tech) => (
                            <td key={tech} title={`${project.shortTitle}: ${tech}`}>
                              <span
                                aria-hidden="true"
                                className={`mx-auto block size-[22px] rounded-[5px] ${used.has(tech) ? 'bg-accent' : 'bg-elevated'}`}
                              />
                              <span className="sr-only">{used.has(tech) ? 'Used' : 'Not used'}</span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 flex items-center gap-3 text-xs text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-3 rounded-[4px] bg-accent" /> Used
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-3 rounded-[4px] bg-elevated" /> Not used
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
