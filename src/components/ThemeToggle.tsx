import { AnimatePresence, m } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn('icon-btn', className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          className="inline-flex"
          initial={{ opacity: 0, rotate: -50, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 50, scale: 0.8 }}
          transition={{ duration: 0.16 }}
        >
          {isDark ? <Sun className="size-[18px]" aria-hidden="true" /> : <Moon className="size-[18px]" aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
