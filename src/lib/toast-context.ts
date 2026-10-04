import { createContext } from 'react';

export type ToastTone = 'success' | 'info' | 'error';

export type ToastContextValue = {
  toast: (message: string, tone?: ToastTone) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
