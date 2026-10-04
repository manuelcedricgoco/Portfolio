import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonClasses } from '@/components/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

type NotFoundProps = {
  title?: string;
  description?: string;
};

export default function NotFound({
  title = 'Page not found',
  description = 'The page you’re looking for doesn’t exist or has moved.',
}: NotFoundProps) {
  useDocumentTitle(`${title} | Manuel Cedric Goco`);

  return (
    <section aria-labelledby="not-found-title" className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-28 pb-20">
      <p className="text-6xl font-semibold text-accent-text tabular-nums">404</p>
      <h1 id="not-found-title" className="mt-4 text-3xl font-semibold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-[48ch] text-muted">{description}</p>
      <Link to="/" className={buttonClasses('primary', 'md', 'mt-8')}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
