import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { copyText } from '@/utils/clipboard';
import { cn } from '@/utils/cn';

type CopyButtonProps = {
  text: string;
  /** What is being copied, used for the accessible name and the toast ("Email address") */
  label: string;
  className?: string;
};

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    const ok = await copyText(text);
    if (!ok) {
      toast(`Couldn’t copy automatically. Select the ${label.toLowerCase()} and copy it manually.`, 'error');
      return;
    }
    setCopied(true);
    toast(`${label} copied to clipboard`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" onClick={handleCopy} aria-label={`Copy ${label.toLowerCase()}`} className={cn('icon-btn size-9', className)}>
      {copied ? <Check className="size-4 text-emerald-500" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
    </button>
  );
}
