/**
 * Normalizes a string for case- and accent-insensitive comparisons,
 * e.g. "Crêperie" -> "creperie", so a search for "creperie" still matches.
 */
export function normalizeForSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}
