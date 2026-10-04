import { Mail, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { GithubIcon, LinkedinIcon } from '@/components/BrandIcons';
import { ContactForm } from '@/components/ContactForm';
import { CopyButton } from '@/components/CopyButton';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { profile } from '@/data/profile';

function ContactRow({ icon, label, children, action }: { icon: ReactNode; label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <li className="flex items-center gap-4 border-b border-line py-4 first:pt-0">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent-text">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">{label}</p>
        <div className="truncate font-medium">{children}</div>
      </div>
      {action}
    </li>
  );
}

const linkClass = 'underline-offset-4 transition-colors hover:text-accent-text hover:underline';
const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/** Shown only while developing, so you can see where unset contact details will appear. */
function SetupHint({ field }: { field: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <li className="my-4 rounded-lg border border-dashed border-line-strong px-4 py-3 text-sm text-muted">
      Dev hint: set <code className="font-mono text-fg">{field}</code> in <code className="font-mono text-fg">src/data/profile.ts</code> — hidden in
      production until you do.
    </li>
  );
}

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading id="contact-title" title={profile.contact.title} description={profile.contact.text} size="compact" />

          <Reveal delay={0.1}>
            <ul>
              {profile.email ? (
                <ContactRow icon={<Mail className="size-5" aria-hidden="true" />} label="Email" action={<CopyButton text={profile.email} label="Email address" />}>
                  <a href={`mailto:${profile.email}`} className={linkClass}>
                    {profile.email}
                  </a>
                </ContactRow>
              ) : (
                <SetupHint field="email" />
              )}

              <ContactRow icon={<GithubIcon className="size-5" />} label="GitHub">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {display(profile.github)}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </ContactRow>

              {profile.linkedin ? (
                <ContactRow icon={<LinkedinIcon className="size-5" />} label="LinkedIn">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {display(profile.linkedin)}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </ContactRow>
              ) : (
                <SetupHint field="linkedin" />
              )}

              <ContactRow icon={<MapPin className="size-5" aria-hidden="true" />} label="Location">
                {profile.location}
              </ContactRow>
            </ul>
          </Reveal>
        </div>

        <Reveal className="min-w-0 lg:col-span-7" delay={0.1}>
          <div className="rounded-2xl border border-line-strong bg-surface p-6 shadow-[var(--shadow-panel)] sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
