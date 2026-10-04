import { profile } from '@/data/profile';

/** Dev-only reminder about contact details that still need to be filled in. */
export function warnAboutPlaceholders() {
  const missing: string[] = [];
  if (!profile.email) missing.push('email');
  if (!profile.linkedin) missing.push('linkedin');
  if (missing.length === 0) return;

  console.warn(
    `[portfolio] Add your ${missing.join(' and ')} in src/data/profile.ts — they stay hidden on the site until you do.`,
  );
}
