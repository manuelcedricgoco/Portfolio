import { useEffect, useRef } from 'react';
import type { ProjectVideo as ProjectVideoData } from '@/utils/projectVideos';
import { cn } from '@/utils/cn';

type ProjectVideoProps = {
  video: ProjectVideoData;
  label: string;
  className?: string;
};

/** Muted looping demo that only plays while on screen, and stays a still poster for reduced-motion users. */
export function ProjectVideo({ video, label, className }: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={video.src}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={cn('size-full bg-black object-contain', className)}
    />
  );
}
