import type { Employer } from '@/types/content'

// Neel's role on a project follows from who it was delivered for (his wording,
// 2026-09-27). Projects without an `employer` (personal / not yet mapped)
// show no role.
export const ROLE_BY_EMPLOYER: Record<Employer, string> = {
  'Tech Alchemy': 'Blockchain | Technical Architect | Pseudo Lead',
  SoluLab: 'Tech Lead | Senior Blockchain Developer',
}

export function isEmployer(value: unknown): value is Employer {
  return typeof value === 'string' && value in ROLE_BY_EMPLOYER
}
