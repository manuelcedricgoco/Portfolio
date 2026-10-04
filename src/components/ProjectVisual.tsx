import type { ProjectVisualKind } from '@/data/types';
import { cn } from '@/utils/cn';

type ProjectVisualProps = {
  kind: ProjectVisualKind;
  title: string;
  slug: string;
  className?: string;
};

/**
 * Placeholder shown until real screenshots exist in src/assets/images/projects/<slug>/.
 * It is a neutral wireframe, clearly labelled — not a fake screenshot.
 */
export function ProjectVisual({ kind, title, slug, className }: ProjectVisualProps) {
  return (
    <div role="img" aria-label={`Screenshot placeholder for ${title}`} className={cn('relative overflow-hidden bg-elevated', className)}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <Chrome />
        {kind === 'dashboard' && <Dashboard />}
        {kind === 'events' && <Events />}
        {kind === 'map' && <MapView />}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3">
        <span className="rounded-full border border-line-strong bg-surface/90 px-3 py-1 text-xs text-muted backdrop-blur">
          {import.meta.env.DEV ? `Add screenshots to src/assets/images/projects/${slug}/` : 'Screenshot coming soon'}
        </span>
      </div>
    </div>
  );
}

function Chrome() {
  return (
    <>
      <rect width="640" height="400" className="fill-bg" />
      <rect width="640" height="34" className="fill-surface" />
      <line x1="0" y1="34" x2="640" y2="34" className="stroke-line" />
      <circle cx="18" cy="17" r="4.5" className="fill-line-strong" />
      <circle cx="34" cy="17" r="4.5" className="fill-line-strong" />
      <circle cx="50" cy="17" r="4.5" className="fill-line-strong" />
      <rect x="86" y="9" width="220" height="16" rx="8" className="fill-elevated" />
    </>
  );
}

function Dashboard() {
  const bars = [60, 92, 74, 118, 98, 132];
  return (
    <>
      <rect x="0" y="34" width="116" height="366" className="fill-surface" />
      <line x1="116" y1="34" x2="116" y2="400" className="stroke-line" />
      <rect x="14" y="52" width="56" height="10" rx="5" className="fill-accent" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="14"
          y={84 + i * 28}
          width={i === 0 ? 88 : 62 + ((i * 13) % 26)}
          height="9"
          rx="4.5"
          className={i === 0 ? 'fill-accent-soft' : 'fill-elevated'}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={136 + i * 166} y="52" width="150" height="66" rx="10" className="fill-surface stroke-line" />
          <rect x={150 + i * 166} y="67" width="46" height="7" rx="3.5" className="fill-elevated" />
          <rect x={150 + i * 166} y="86" width="72" height="16" rx="4" className="fill-line-strong" />
        </g>
      ))}
      <rect x="136" y="134" width="316" height="172" rx="10" className="fill-surface stroke-line" />
      <rect x="152" y="149" width="84" height="8" rx="4" className="fill-elevated" />
      <polyline
        points="152,282 190,262 228,270 266,232 304,242 342,206 380,214 418,176"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
      <rect x="468" y="134" width="156" height="172" rx="10" className="fill-surface stroke-line" />
      <rect x="484" y="149" width="60" height="8" rx="4" className="fill-elevated" />
      {bars.map((h, i) => (
        <rect key={i} x={486 + i * 22} y={288 - h} width="14" height={h} rx="3" className={i === 5 ? 'fill-accent' : 'fill-accent-soft'} />
      ))}
      <rect x="136" y="322" width="488" height="66" rx="10" className="fill-surface stroke-line" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="152" y={336 + i * 17} width="120" height="7" rx="3.5" className="fill-elevated" />
          <rect x="300" y={336 + i * 17} width="80" height="7" rx="3.5" className="fill-elevated" />
          <rect x="520" y={336 + i * 17} width="84" height="7" rx="3.5" className={i === 0 ? 'fill-accent-soft' : 'fill-elevated'} />
        </g>
      ))}
    </>
  );
}

function QrCode({ x, y, size }: { x: number; y: number; size: number }) {
  const cells = 15;
  const cell = size / cells;
  const finder = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      <rect x={x + cx * cell} y={y + cy * cell} width={cell * 5} height={cell * 5} className="fill-fg" opacity={0.85} />
      <rect x={x + (cx + 1) * cell} y={y + (cy + 1) * cell} width={cell * 3} height={cell * 3} className="fill-surface" />
      <rect x={x + (cx + 2) * cell} y={y + (cy + 2) * cell} width={cell} height={cell} className="fill-fg" opacity={0.85} />
    </g>
  );
  const modules = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const inFinder = (r < 6 && c < 6) || (r < 6 && c > cells - 7) || (r > cells - 7 && c < 6);
      if (inFinder) continue;
      if ((r * 7 + c * 11 + r * c) % 5 < 2) {
        modules.push(<rect key={`${r}-${c}`} x={x + c * cell} y={y + r * cell} width={cell} height={cell} className="fill-fg" opacity={0.8} />);
      }
    }
  }
  return (
    <g>
      {finder(0, 0)}
      {finder(cells - 5, 0)}
      {finder(0, cells - 5)}
      {modules}
    </g>
  );
}

function Events() {
  return (
    <>
      <rect x="0" y="34" width="640" height="34" className="fill-surface" />
      <line x1="0" y1="68" x2="640" y2="68" className="stroke-line" />
      <rect x="20" y="46" width="48" height="10" rx="5" className="fill-accent" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={96 + i * 58} y="47" width="40" height="8" rx="4" className="fill-elevated" />
      ))}
      <rect x="24" y="86" width="372" height="124" rx="12" className="fill-accent-soft stroke-line" />
      <rect x="44" y="106" width="150" height="12" rx="6" className="fill-line-strong" />
      <rect x="44" y="128" width="260" height="8" rx="4" className="fill-elevated" />
      <rect x="44" y="144" width="220" height="8" rx="4" className="fill-elevated" />
      <rect x="44" y="172" width="86" height="22" rx="6" className="fill-accent" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={24 + i * 128} y="226" width="116" height="150" rx="10" className="fill-surface stroke-line" />
          <rect x={34 + i * 128} y="236" width="96" height="62" rx="6" className="fill-elevated" />
          <rect x={34 + i * 128} y="310" width="70" height="8" rx="4" className="fill-line-strong" />
          <rect x={34 + i * 128} y="326" width="96" height="6" rx="3" className="fill-elevated" />
          <rect x={34 + i * 128} y="344" width="40" height="14" rx="7" className={i === 0 ? 'fill-accent' : 'fill-accent-soft'} />
        </g>
      ))}
      <rect x="412" y="86" width="204" height="204" rx="12" className="fill-surface stroke-line" />
      <QrCode x={432} y={106} size={164} />
      <rect x="412" y="304" width="204" height="72" rx="12" className="fill-surface stroke-line" />
      <rect x="428" y="320" width="64" height="8" rx="4" className="fill-elevated" />
      <rect x="428" y="338" width="90" height="16" rx="4" className="fill-line-strong" />
      <polyline points="540,356 556,344 572,350 588,330 602,336" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent" />
    </>
  );
}

function MapView() {
  const pins: Array<[number, number]> = [
    [118, 150],
    [206, 214],
    [296, 128],
    [330, 232],
    [158, 270],
    [250, 300],
  ];
  return (
    <>
      <rect x="24" y="52" width="404" height="324" rx="12" className="fill-elevated stroke-line" />
      {[1, 2, 3, 4, 5].map((i) => (
        <line key={`h${i}`} x1="24" y1={52 + i * 54} x2="428" y2={52 + i * 54} className="stroke-line" />
      ))}
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={`v${i}`} x1={24 + i * 50.5} y1="52" x2={24 + i * 50.5} y2="376" className="stroke-line" />
      ))}
      <path d="M24 318 C 96 276 150 346 226 304 S 350 266 428 296 L428 376 L24 376 Z" className="fill-accent-soft" />
      <path d="M24 318 C 96 276 150 346 226 304 S 350 266 428 296" fill="none" strokeWidth="2" className="stroke-accent" />
      {pins.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="15" className="fill-accent-soft" />
          <circle cx={cx} cy={cy} r="6" className="fill-accent" />
        </g>
      ))}
      <rect x="444" y="52" width="172" height="324" rx="12" className="fill-surface stroke-line" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="466" cy={82 + i * 40} r="8" className={i === 0 ? 'fill-accent' : 'fill-accent-soft'} />
          <rect x="484" y={74 + i * 40} width="92" height="7" rx="3.5" className="fill-line-strong" />
          <rect x="484" y={87 + i * 40} width="60" height="6" rx="3" className="fill-elevated" />
        </g>
      ))}
      <rect x="460" y="288" width="140" height="68" rx="8" className="fill-elevated" />
      {[28, 44, 36, 58, 48].map((h, i) => (
        <rect key={i} x={474 + i * 24} y={348 - h} width="14" height={h} rx="3" className="fill-accent-soft" />
      ))}
    </>
  );
}
