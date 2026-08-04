export type Day = {
  day: number;
  numbers: string[];
  words: string[];
  sentences: string[];
  notes: string[];
};

export type Level = {
  slug: string;
  name: string;
  subtitle?: string;
  days: Day[];
};
