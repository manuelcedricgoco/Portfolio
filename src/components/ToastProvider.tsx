import { AnimatePresence, m } from 'framer-motion';
import { CircleAlert, CircleCheck, Info } from 'lucide-react';
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { ToastContext, type ToastTone } from '@/lib/toast-context';
import { cn } from '@/utils/cn';

type ToastItem = { id: number; message: string; tone: ToastTone };

const icons = { success: CircleCheck, info: Info, error: CircleAlert } as const;
const iconTone: Record<ToastTone, string> = {
  success: 'text-emerald-500',
  info: 'text-accent-text',
  error: 'text-red-500',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);

  const toast = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      const id = ++nextId.current;
      setToasts((list) => [...list.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 3400);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext value={value}>
      {children}
      {/* Always mounted so screen readers announce new toasts politely. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[95] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence initial={false}>
          {toasts.map((item) => {
            const Icon = icons[item.tone];
            return (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.22 }}
                className="pointer-events-auto flex max-w-[min(92vw,26rem)] items-center gap-2.5 rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]"
              >
                <Icon className={cn('size-[18px] shrink-0', iconTone[item.tone])} aria-hidden="true" />
                <span>{item.message}</span>
              </m.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext>
  );
}
