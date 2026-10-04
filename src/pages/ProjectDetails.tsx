import { m } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ImageIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GithubIcon } from '@/components/BrandIcons';
import { ButtonLink, buttonClasses } from '@/components/Button';
import { ImageLightbox } from '@/components/ImageLightbox';
import { ProjectVideo } from '@/components/ProjectVideo';
import { ProjectVisual } from '@/components/ProjectVisual';
import { SectionLink } from '@/components/SectionLink';
import { SmartImage } from '@/components/SmartImage';
import { Tag } from '@/components/Tag';
import { profile } from '@/data/profile';
import { getAdjacentProjects, getProject, repoName } from '@/data/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { EASE } from '@/lib/variants';
import { getProjectImages } from '@/utils/projectImages';
import { getProjectVideo } from '@/utils/projectVideos';
import NotFound from './NotFound';

function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-semibold sm:text-[1.7rem]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-[0.95rem] text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useDocumentTitle(project ? `${project.title} — Case Study | ${profile.name}` : undefined);

  if (!project) {
    return <NotFound title="Project not found" description="That project doesn’t exist. Head back to the projects section to see what’s available." />;
  }

  const images = getProjectImages(project);
  const video = getProjectVideo(project);
  const adjacent = getAdjacentProjects(project.slug);
  const id = (name: string) => `${project.slug}-${name}`;

  return (
    <m.article
      aria-labelledby={id('title')}
      className="container-page pt-28 pb-24 sm:pt-32"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <SectionLink
        section="projects"
        className="inline-flex items-center gap-2 rounded-md text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to projects
      </SectionLink>

      <header className="mt-8 max-w-3xl">
        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {project.categories.map((category) => (
            <li key={category}>
              <Tag accent>{category}</Tag>
            </li>
          ))}
        </ul>
        <h1 id={id('title')} className="mt-5 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg text-muted">{project.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={project.github} external size="lg" icon={<GithubIcon className="size-[18px]" />}>
            View on GitHub
          </ButtonLink>
          <SectionLink section="contact" className={buttonClasses('secondary', 'lg')}>
            Get in touch
          </SectionLink>
        </div>
      </header>

      <div className="mt-12 overflow-hidden rounded-2xl border border-line-strong shadow-[var(--shadow-panel)]">
        {video ? (
          <ProjectVideo video={video} label={`${project.title} demo`} className="aspect-[2/1] w-full" />
        ) : images[0] ? (
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label={`Open screenshot: ${images[0].caption}`}
            className="block w-full cursor-zoom-in"
          >
            <SmartImage src={images[0].src} alt={`${project.title}: ${images[0].caption}`} className="aspect-[16/9] w-full" eager />
          </button>
        ) : (
          <ProjectVisual kind={project.visual} title={project.title} slug={project.slug} className="aspect-[16/9] w-full" />
        )}
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 space-y-14 lg:col-span-8">
          <CaseSection id={id('overview')} title="Overview">
            <p className="max-w-[66ch] text-base text-muted sm:text-lg">{project.overview}</p>
          </CaseSection>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <section aria-labelledby={id('problem')} className="bg-surface p-6">
              <h2 id={id('problem')} className="text-xl font-semibold">
                Problem
              </h2>
              <p className="mt-3 text-[0.95rem] text-muted">{project.problem}</p>
            </section>
            <section aria-labelledby={id('solution')} className="bg-surface p-6">
              <h2 id={id('solution')} className="text-xl font-semibold">
                Solution
              </h2>
              <p className="mt-3 text-[0.95rem] text-muted">{project.solution}</p>
            </section>
          </div>

          <CaseSection id={id('features')} title="Main features">
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[0.95rem] text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </CaseSection>

          {project.security && (
            <CaseSection id={id('security')} title="Security practices">
              <p className="mb-4 max-w-[60ch] text-sm text-muted">Implemented in the repository, per its README and source.</p>
              <BulletList items={project.security} />
            </CaseSection>
          )}

          <div className="grid gap-10 md:grid-cols-2">
            <CaseSection id={id('challenges')} title="Challenges">
              <BulletList items={project.challenges} />
            </CaseSection>
            <CaseSection id={id('learned')} title="What I learned">
              <BulletList items={project.learned} />
            </CaseSection>
          </div>

          <CaseSection id={id('screenshots')} title="Screenshots">
            {images.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2">
                {images.map((image, index) => (
                  <li key={image.src}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Open screenshot: ${image.caption}`}
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line text-left transition-colors hover:border-accent/50"
                    >
                      <SmartImage
                        src={image.src}
                        alt={`${project.title}: ${image.caption}`}
                        className="aspect-[16/10] w-full"
                        imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="block border-t border-line px-4 py-2.5 text-sm text-muted">{image.caption}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-line-strong p-8 text-center">
                <ImageIcon className="mx-auto size-6 text-faint" aria-hidden="true" />
                <p className="mt-3 font-medium">Screenshots coming soon.</p>
                {import.meta.env.DEV && (
                  <p className="mx-auto mt-2 max-w-[52ch] font-mono text-xs text-muted">
                    Add images to src/assets/images/projects/{project.slug}/ (for example 01-dashboard.webp) and they appear here automatically.
                  </p>
                )}
              </div>
            )}
          </CaseSection>
        </div>

        <aside aria-label="Project summary" className="min-w-0 lg:col-span-4">
          <div className="space-y-6 rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
            <dl className="space-y-5">
              <div>
                <dt className="text-sm text-muted">Type</dt>
                <dd className="mt-1 font-medium">{project.type}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">My role</dt>
                <dd className="mt-1 text-[0.95rem]">{project.role}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Technologies</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Repository</dt>
                <dd className="mt-1 font-mono text-sm break-all">{repoName(project)}</dd>
              </div>
            </dl>
            <ButtonLink href={project.github} external className="w-full" icon={<GithubIcon className="size-[18px]" />}>
              View on GitHub
            </ButtonLink>
          </div>
        </aside>
      </div>

      {adjacent && (
        <nav aria-label="More projects" className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <Link to={`/projects/${adjacent.prev.slug}`} className="group bg-surface p-6 transition-colors hover:bg-elevated">
            <span className="flex items-center gap-2 text-sm text-muted">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Previous project
            </span>
            <span className="mt-2 block text-lg font-semibold transition-colors group-hover:text-accent-text">{adjacent.prev.title}</span>
          </Link>
          <Link to={`/projects/${adjacent.next.slug}`} className="group bg-surface p-6 transition-colors hover:bg-elevated sm:text-right">
            <span className="flex items-center gap-2 text-sm text-muted sm:justify-end">
              Next project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-lg font-semibold transition-colors group-hover:text-accent-text">{adjacent.next.title}</span>
          </Link>
        </nav>
      )}

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        title={project.title}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </m.article>
  );
}
