type ClassValue = string | number | false | null | undefined | ClassValue[];

/** Tiny className joiner: cn('a', cond && 'b', ['c']) → "a b c" */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) {
      const inner = cn(...value);
      if (inner) out.push(inner);
    } else {
      out.push(String(value));
    }
  }
  return out.join(' ');
}
