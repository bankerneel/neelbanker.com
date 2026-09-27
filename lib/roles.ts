import type { Employer } from '@/types/content'

// Neel's role on a project follows from who it was delivered for (his wording,
// 2026-09-27). Naming follows the same split: SoluLab projects use their real
// names, Tech Alchemy projects keep codenames, personal projects use pseudonyms.
// Projects without an `employer` (not yet mapped) show no role.
export const ROLE_BY_EMPLOYER: Record<Employer, string> = {
  'Tech Alchemy': 'Blockchain | Technical Architect | Pseudo Lead',
  SoluLab: 'Tech Lead | Senior Blockchain Developer',
  Personal: 'Independent build',
}

export function isEmployer(value: unknown): value is Employer {
  return typeof value === 'string' && Object.hasOwn(ROLE_BY_EMPLOYER, value)
}
