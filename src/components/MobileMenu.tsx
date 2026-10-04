import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef, type RefObject } from 'react';
import { GithubIcon } from '@/components/BrandIcons';
import { buttonClasses } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { SectionLink } from '@/components/SectionLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { navLinks } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { EASE } from '@/lib/variants';
import { cn } from '@/utils/cn';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: string;
  returnFocusRef: RefObject<HTMLElement | null>;
};

export function MobileMenu({ open, onClose, active, returnFocusRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open, { onEscape: onClose, returnFocusRef });
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="overlay"
          aria-hidden="true"
          className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        />
      )}
      {open && (
        <m.div
          key="panel"
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="fixed inset-y-0 right-0 z-[70] flex w-[min(88vw,22rem)] flex-col border-l border-line-strong bg-surface p-5 shadow-2xl md:hidden"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex items-center justify-between">
            <Logo onNavigate={onClose} />
            <button type="button" onClick={onClose} className="icon-btn" aria-label="Close menu">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
            <ul>
              {navLinks.map((link, index) => {
                const isActive = active === link.section;
                return (
                  <m.li
                    key={link.section}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.04, duration: 0.3, ease: EASE }}
                  >
                    <SectionLink
                      section={link.section}
                      onNavigate={onClose}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight transition-colors',
                        isActive ? 'text-accent-text' : 'text-fg hover:text-accent-text',
                      )}
                    >
                      {link.label}
                      {isActive && <span aria-hidden="true" className="size-2 rounded-full bg-accent" />}
                    </SectionLink>
                  </m.li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 flex items-center gap-2">
            <ThemeToggle className="border border-line" />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="icon-btn border border-line"
            >
              <GithubIcon className="size-[18px]" />
            </a>
            <SectionLink section="contact" onNavigate={onClose} className={buttonClasses('primary', 'md', 'flex-1')}>
              Let’s Talk
            </SectionLink>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
