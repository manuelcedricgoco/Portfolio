import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { ProjectImage } from '@/utils/projectImages';

type ImageLightboxProps = {
  images: ProjectImage[];
  /** Index of the open image, or null when closed */
  index: number | null;
  title: string;
  onClose: () => void;
  onChange: (index: number) => void;
};

const controlClass =
  'inline-flex size-11 items-center justify-center rounded-full bg-black/65 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-black/85';

export function ImageLightbox({ images, index, title, onClose, onChange }: ImageLightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  useFocusTrap(dialogRef, open, { onEscape: onClose });
  useLockBodyScroll(open);

  useEffect(() => {
    if (index === null || count < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onChange((index + 1) % count);
      if (event.key === 'ArrowLeft') onChange((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onChange]);

  const current = index === null ? undefined : images[index];

  return (
    <AnimatePresence>
      {current && index !== null && (
        <m.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex flex-col gap-4 bg-black/85 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm">
            <p aria-live="polite" className="text-white/70">
              <span className="font-medium text-white">{current.caption}</span>
              <span className="ml-3">
                {index + 1} / {count}
              </span>
            </p>
            <button type="button" onClick={onClose} aria-label="Close screenshot viewer" className={controlClass}>
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <m.img
              key={current.src}
              src={current.src}
              alt={`${title}: ${current.caption}`}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() => onChange((index - 1 + count) % count)}
                  className={`${controlClass} absolute left-0 sm:left-2`}
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() => onChange((index + 1) % count)}
                  className={`${controlClass} absolute right-0 sm:right-2`}
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
