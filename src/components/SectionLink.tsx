import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/utils/scroll';
import { sectionHref } from '@/utils/site';

type SectionLinkProps = {
  /** id of the section on the home page, e.g. "projects" */
  section: string;
  /** Called before navigating (e.g. to close the mobile menu) */
  onNavigate?: () => void;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/**
 * A real link (works with middle-click, copy-link, and no-JS crawlers) that smooth-scrolls
 * when you're already on the home page, and routes back home first when you're not.
 */
export function SectionLink({ section, onNavigate, onClick, children, ...rest }: SectionLinkProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate?.();
    if (pathname === '/') scrollToSection(section);
    else navigate({ pathname: '/', hash: `#${section}` });
  };

  return (
    <a href={sectionHref(section)} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
