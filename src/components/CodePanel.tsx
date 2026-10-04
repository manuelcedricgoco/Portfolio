import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useId, useMemo, useState, type KeyboardEvent } from 'react';
import { TechIcon } from '@/components/TechIcon';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { cn } from '@/utils/cn';

type Kind = 'kw' | 'str' | 'prop' | 'punc' | 'com' | 'plain';
type Token = { k: Kind; v: string };

const t = (k: Kind, v: string): Token => ({ k, v });
const indent = (n: number) => t('plain', ' '.repeat(n));
const kindClass: Record<Kind, string> = {
  kw: 'syn-kw',
  str: 'syn-str',
  prop: 'syn-prop',
  punc: 'syn-punc',
  com: 'syn-com',
  plain: '',
};

type TabId = 'developer' | 'systems';
const TABS: { id: TabId; file: string }[] = [
  { id: 'developer', file: 'developer.ts' },
  { id: 'systems', file: 'systems.ts' },
];

/** Built from the data files, so the panel always matches the rest of the site. */
function developerLines(): Token[][] {
  return [
    [t('kw', 'const'), t('plain', ' developer '), t('punc', '= {')],
    [indent(2), t('prop', 'name'), t('punc', ': '), t('str', `"${profile.name}"`), t('punc', ',')],
    [indent(2), t('prop', 'role'), t('punc', ': '), t('str', `"${profile.role}"`), t('punc', ',')],
    [indent(2), t('prop', 'education'), t('punc', ': '), t('str', `"${profile.education.short}"`), t('punc', ',')],
    [indent(2), t('prop', 'focus'), t('punc', ': [')],
    ...profile.focus.map((item): Token[] => [indent(4), t('str', `"${item}"`), t('punc', ',')]),
    [indent(2), t('punc', '],')],
    [t('punc', '};')],
  ];
}

function systemsLines(): Token[][] {
  return [
    [t('kw', 'export const'), t('plain', ' systems '), t('punc', '= [')],
    ...projects.map((project): Token[] => [
      indent(2),
      t('punc', '{ '),
      t('prop', 'name'),
      t('punc', ': '),
      t('str', `"${project.shortTitle}"`),
      t('punc', ', '),
      t('prop', 'type'),
      t('punc', ': '),
      t('str', `"${project.type}"`),
      t('punc', ' },'),
    ]),
    [t('punc', '];')],
    [t('com', `// source: github.com/${profile.githubUsername}`)],
  ];
}

const FLOATERS = [
  { name: 'React', position: '-top-4 right-5', duration: 6, delay: 0 },
  { name: 'PHP', position: '-bottom-4 left-6', duration: 5.5, delay: 0.9 },
  { name: 'MySQL', position: '-bottom-4 right-8', duration: 6.5, delay: 0.4 },
] as const;

function FloatingBadge({ name, position, duration, delay }: (typeof FLOATERS)[number]) {
  const reduce = useReducedMotion();
  return (
    <m.div
      aria-hidden="true"
      className={cn(
        'absolute z-10 hidden items-center gap-2 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-sm font-medium text-muted shadow-lg lg:flex',
        position,
      )}
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <TechIcon name={name} className="size-[18px] text-accent-text" />
      {name}
    </m.div>
  );
}

export function CodePanel() {
  const uid = useId();
  const [tab, setTab] = useState<TabId>('developer');
  const lines = useMemo(() => (tab === 'developer' ? developerLines() : systemsLines()), [tab]);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next: TabId = tab === 'developer' ? 'systems' : 'developer';
    setTab(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <div className="relative">
      {FLOATERS.map((floater) => (
        <FloatingBadge key={floater.name} {...floater} />
      ))}

      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface/90 shadow-[var(--shadow-panel)] backdrop-blur">
        <div className="flex items-center gap-4 border-b border-line bg-elevated/40 pr-4 pl-4">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <div role="tablist" aria-label="Code samples" className="flex">
            {TABS.map(({ id, file }) => {
              const selected = tab === id;
              return (
                <button
                  key={id}
                  id={`${uid}-tab-${id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(id)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    'relative px-3.5 py-3 font-mono text-xs transition-colors',
                    selected ? 'text-fg' : 'text-faint hover:text-muted',
                  )}
                >
                  {file}
                  {selected && <span aria-hidden="true" className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent" />}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${tab}`}
          tabIndex={0}
          className="min-h-[17.5rem] overflow-x-auto px-4 pt-5 pb-8 font-mono text-[0.78rem] leading-[1.75] sm:text-[0.82rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.pre
              key={tab}
              className="m-0"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <code>
                {lines.map((tokens, row) => (
                  <div key={row} className="flex">
                    <span aria-hidden="true" className="w-8 shrink-0 pr-4 text-right text-faint select-none">
                      {row + 1}
                    </span>
                    <span className="whitespace-pre">
                      {tokens.map((token, index) => (
                        <span key={index} className={kindClass[token.k]}>
                          {token.v}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
                <div className="flex">
                  <span aria-hidden="true" className="w-8 shrink-0 pr-4 text-right text-faint select-none">
                    {lines.length + 1}
                  </span>
                  <span aria-hidden="true" className="caret" />
                </div>
              </code>
            </m.pre>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
