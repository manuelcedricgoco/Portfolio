import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SectionLink } from '@/components/SectionLink';
import { footerLinks } from '@/data/navigation';
import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">Designed &amp; built by {profile.name}.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.section}>
                <SectionLink section={link.section} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </SectionLink>
              </li>
            ))}
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
              >
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-5 text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </div>
    </footer>
  );
}
