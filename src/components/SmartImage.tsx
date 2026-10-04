import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Set for above-the-fold images; everything else is lazy-loaded. */
  eager?: boolean;
};

/** Lazy image with a shimmer skeleton until it has loaded. */
export function SmartImage({ src, alt, className, imgClassName, eager = false }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden bg-elevated', className)}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn('size-full object-cover object-top transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', imgClassName)}
      />
    </div>
  );
}
