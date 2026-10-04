import { m } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GithubIcon } from '@/components/BrandIcons';
import { buttonClasses } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { MobileMenu } from '@/components/MobileMenu';
import { SectionLink } from '@/components/SectionLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_SECTION_IDS, navLinks } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';

export function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const spy = useActiveSection(NAV_SECTION_IDS, onHome);
  // On a case-study page the "Projects" link is the closest match.
  const active = onHome ? spy : pathname.startsWith('/projects/') ? 'projects' : '';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer when the route changes or the viewport grows past the mobile breakpoint.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color] duration-300',
          scrolled ? 'border-line bg-bg/80' : 'border-transparent bg-bg/40',
        )}
      >
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.section;
              return (
                <li key={link.section}>
                  <SectionLink
                    section={link.section}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-accent-text' : 'text-muted hover:text-fg',
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-md bg-accent-soft"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    {link.label}
                  </SectionLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="icon-btn hidden sm:inline-flex"
            >
              <GithubIcon className="size-[18px]" />
            </a>
            <ThemeToggle />
            <SectionLink section="contact" className={buttonClasses('primary', 'sm', 'ml-1 hidden md:inline-flex')}>
              Let’s Talk
            </SectionLink>
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-btn md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Rendered outside <header>: backdrop-filter would otherwise trap position:fixed children. */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} returnFocusRef={menuButtonRef} />
    </>
  );
}
