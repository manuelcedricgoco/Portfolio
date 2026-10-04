import type { MouseEvent } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';

export function Layout() {
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  };

  return (
    <>
      <a
        href="#main"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      {/* Restores scroll on back/forward and reload, jumps to #hash targets, and resets to top on new pages.
          Every document's first history entry shares the key "default", so key it by URL instead —
          otherwise a different page opened in the same tab inherits the previous page's scroll offset. */}
      <ScrollRestoration getKey={(location) => (location.key === 'default' ? `${location.pathname}${location.search}${location.hash}` : location.key)} />
    </>
  );
}
