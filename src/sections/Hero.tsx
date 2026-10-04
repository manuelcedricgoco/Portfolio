import { m } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/BrandIcons';
import { buttonClasses } from '@/components/Button';
import { SectionLink } from '@/components/SectionLink';
import portrait from '@/assets/images/profile/portrait.webp';
import { profile } from '@/data/profile';
import { EASE, fadeUp, staggerContainer } from '@/lib/variants';

const container = staggerContainer(0.09, 0.05);
const itemTransition = { duration: 0.65, ease: EASE };

const linkClass = 'inline-flex items-center gap-2 transition-colors hover:text-fg';

/** Wraps hyphenated words in a no-wrap span so "Real-World" never breaks after the hyphen. */
function NoBreakHyphens({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\w+(?:-\w+)+)/).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      <div aria-hidden="true" className="hero-grid" />
      <div aria-hidden="true" className="hero-glow" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <m.div className="min-w-0 lg:col-span-7" variants={container} initial="hidden" animate="visible">
          <m.p
            variants={fadeUp}
            transition={itemTransition}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/70 py-1.5 pr-4 pl-3 text-[0.8rem] text-muted backdrop-blur sm:text-sm"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-text" />
            {profile.badge}
          </m.p>

          <m.h1
            id="hero-title"
            variants={fadeUp}
            transition={itemTransition}
            className="mt-6 text-[2.6rem] leading-[1.03] font-semibold sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]"
          >
            <NoBreakHyphens text={profile.headline} />
          </m.h1>

          <m.p variants={fadeUp} transition={itemTransition} className="mt-6 max-w-[54ch] text-base text-muted sm:text-lg">
            {profile.intro}
          </m.p>

          <m.div variants={fadeUp} transition={itemTransition} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <SectionLink section="projects" className={buttonClasses('primary', 'lg')}>
              View My Projects
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
            </SectionLink>
            <SectionLink section="contact" className={buttonClasses('secondary', 'lg')}>
              Let’s Connect
            </SectionLink>
          </m.div>

          <m.ul variants={fadeUp} transition={itemTransition} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GithubIcon className="size-4" />
                GitHub
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
              </li>
            )}
          </m.ul>
        </m.div>

        <m.div
          className="min-w-0 lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl">
              <img
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                width={800}
                height={1067}
                className="aspect-[3/4] w-full object-cover object-top"
                fetchPriority="high"
              />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
