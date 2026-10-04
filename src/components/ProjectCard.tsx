import { m } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ButtonLink, buttonClasses } from '@/components/Button';
import { ProjectVideo } from '@/components/ProjectVideo';
import { ProjectVisual } from '@/components/ProjectVisual';
import { SmartImage } from '@/components/SmartImage';
import { Tag } from '@/components/Tag';
import type { Project } from '@/data/types';
import { prefetchProjectDetails } from '@/lib/routes';
import { EASE } from '@/lib/variants';
import { cn } from '@/utils/cn';
import { getProjectImages } from '@/utils/projectImages';
import { getProjectVideo } from '@/utils/projectVideos';

const MAX_TAGS = 6;

type ProjectCardProps = {
  project: Project;
  /** Wide layout spanning both columns on large screens */
  featured?: boolean;
  /** Position in the list, used to stagger the entrance */
  index?: number;
};

export function ProjectCard({ project, featured = false, index = 0 }: ProjectCardProps) {
  const cover = getProjectImages(project)[0];
  const video = getProjectVideo(project);
  const to = `/projects/${project.slug}`;
  const tags = project.technologies.slice(0, MAX_TAGS);
  const extra = project.technologies.length - tags.length;
  const titleId = `project-${project.slug}-title`;

  return (
    <m.li
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
      className={cn(featured && 'lg:col-span-2')}
    >
      <article
        aria-labelledby={titleId}
        className={cn(
          'group relative flex h-full overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_28px_60px_-34px_var(--accent)]',
          featured ? 'flex-col lg:flex-row' : 'flex-col',
        )}
      >
        <Link
          to={to}
          tabIndex={-1}
          aria-hidden="true"
          className={cn(
            'relative block shrink-0 overflow-hidden bg-elevated',
            // Demo videos are 2:1, so their frame matches that ratio and nothing gets cropped.
            video
              ? featured
                ? 'aspect-[2/1] lg:aspect-auto lg:w-[62%]'
                : 'aspect-[2/1]'
              : featured
                ? 'aspect-[16/10] lg:aspect-auto lg:w-[56%]'
                : 'aspect-[16/10]',
          )}
        >
          <div className={cn('absolute inset-0', !video && 'transition-transform duration-700 ease-out group-hover:scale-[1.04]')}>
            {video ? (
              <ProjectVideo video={video} label={`${project.title} demo`} />
            ) : cover ? (
              <SmartImage src={cover.src} alt="" className="size-full" />
            ) : (
              <ProjectVisual kind={project.visual} title={project.title} slug={project.slug} className="size-full" />
            )}
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="absolute top-3 right-3 rounded-full border border-line-strong bg-surface/90 px-2.5 py-1 text-xs font-medium text-fg backdrop-blur">
            {project.type}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
          <h3 id={titleId} className="text-xl font-semibold sm:text-2xl">
            <Link to={to} onPointerEnter={prefetchProjectDetails} onFocus={prefetchProjectDetails} className="rounded-sm transition-colors hover:text-accent-text">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-[0.95rem] text-muted">{project.summary}</p>

          <ul className="mt-4 space-y-2 text-sm text-muted">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {tags.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
            {extra > 0 && (
              <li>
                <Tag accent>+{extra} more</Tag>
              </li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Link
              to={to}
              onPointerEnter={prefetchProjectDetails}
              onFocus={prefetchProjectDetails}
              aria-label={`View case study: ${project.title}`}
              className={buttonClasses('primary', 'md')}
            >
              View Case Study
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Link>
            <ButtonLink href={project.github} external variant="secondary" aria-label={`${project.title} on GitHub (opens in a new tab)`}>
              GitHub
            </ButtonLink>
          </div>
        </div>
      </article>
    </m.li>
  );
}
