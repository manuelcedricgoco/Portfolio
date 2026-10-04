/** Shown while the lazy-loaded case-study page downloads. */
export function PageSkeleton() {
  return (
    <div className="container-page pt-32 pb-24" role="status" aria-live="polite">
      <span className="sr-only">Loading project…</span>
      <div className="skeleton h-4 w-28 rounded-md" />
      <div className="skeleton mt-8 h-12 w-3/4 max-w-xl rounded-lg" />
      <div className="skeleton mt-5 h-4 w-full max-w-2xl rounded-md" />
      <div className="skeleton mt-2 h-4 w-2/3 max-w-xl rounded-md" />
      <div className="skeleton mt-10 aspect-[16/8] w-full rounded-2xl" />
    </div>
  );
}
