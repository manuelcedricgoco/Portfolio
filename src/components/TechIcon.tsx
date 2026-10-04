import { Bell, Code, CodeXml, QrCode, ScanFace, type LucideIcon } from 'lucide-react';
import { techIconPaths } from '@/assets/icons/techIcons';

/** Display names that share another technology's glyph. */
const ALIASES: Record<string, string> = {
  'React Vite': 'Vite',
  'Node.js / Express': 'Node.js',
  'React Native': 'React',
  'MySQL / MariaDB': 'MySQL',
};

/** Technologies without a brand glyph fall back to a neutral Lucide icon. */
const FALLBACKS: Record<string, LucideIcon> = {
  'VS Code': CodeXml,
  'QR Code': QrCode,
  SweetAlert2: Bell,
  'face-api.js': ScanFace,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const path = techIconPaths[ALIASES[name] ?? name];

  if (path) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
        <path d={path} />
      </svg>
    );
  }

  const Fallback = FALLBACKS[name] ?? Code;
  return <Fallback className={className} aria-hidden="true" />;
}
