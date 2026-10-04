import { ArrowUpRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'btn group/btn relative select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-fg shadow-[0_10px_28px_-14px_var(--accent)] hover:bg-accent-hover hover:shadow-[0_14px_32px_-14px_var(--accent)]',
  secondary: 'border border-line-strong bg-surface/60 text-fg hover:border-accent/60 hover:bg-elevated',
  ghost: 'text-muted hover:bg-elevated hover:text-fg',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
};

/** Class string for anything that should look like a button (links, router links). */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  icon,
  className,
  children,
  external = false,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a className={buttonClasses(variant, size, className)} {...externalProps} {...rest}>
      {icon}
      {children}
      {external && (
        <>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 opacity-80 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </a>
  );
}
