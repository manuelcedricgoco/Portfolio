import { TechIcon } from '@/components/TechIcon';

export function SkillCard({ name }: { name: string }) {
  return (
    <li className="group flex items-center gap-2.5 rounded-lg border border-line bg-bg/50 px-2.5 py-2.5 transition-[border-color,background-color,translate] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-elevated">
      <TechIcon name={name} className="size-5 shrink-0 text-muted transition-colors duration-200 group-hover:text-accent-text" />
      <span className="text-sm font-medium">{name}</span>
    </li>
  );
}
