import type { Level } from './types';
import { hsk2 } from './hsk2';

export const levels: Level[] = [hsk2];

export function getLevel(slug: string): Level | undefined {
  return levels.find((l) => l.slug === slug);
}
